import React, {Component} from "react";
import {withRouter} from 'react-router';
import axios from "axios";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Config from "../../config";

class ProductList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        allproducts: [],
        deleted: false,
        isError: false,
        errorMsg: 'Internal Server Error!',
    };

    async componentDidMount() {

        await axios.get(Config.BASE_URL +'/products', {}).then(response => {
            this.setState({isError: false})
            let data = response.data

            let products = data.map((product) => {
                return {
                    id: product._id,
                    productName: product.name,
                    price: product.price,
                    qty: product.qty,
                    category: product.category,
                    imagePath: product.imagePath,
                };
            });

            this.setState({allproducts: products});

        }).catch(err => {
            if (err.response) {
                let error = err.response
                this.setState({isError: true, errorMsg: error.data.errors})
                console.log(err.response)
            } else if (err.request) {
                // client never received a response, or request never left
            } else {
                // anything else
            }
        })

    }

    confirmDelete = (productId, row) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteAdmin(productId, row)
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    handleDeleteRow(i) {
        let rows = [...this.state.allproducts]
        rows.splice(i, 1)
        this.setState({
            allproducts: rows
        })
    }

    async deleteAdmin(productId, row) {

        await axios.delete(
            Config.BASE_URL + `/products/${productId}`, {
                headers: {
                    "x-jwt-token": JSON.parse(localStorage.getItem("authToken"))
                },
            }).then(response => {
            this.setState({deleted:true})
            this.handleDeleteRow(row)

        })
            .catch(err => {
                if (err.response) {
                    let error = err.response
                    this.setState({isError: true, errorMsg: error.data.msg})
                    console.log(err.response)
                } else if (err.request) {
                    // client never received a response, or request never left
                } else {
                    // anything else
                }
            })

    }

    render() {
        return (
            <div className="container-fluid">
                <br/>
                {(() => {
                    if (this.state.isError) {
                        return (
                            <div className="alert alert-danger" role="alert">
                                Error occurred.. {this.state.errorMsg}
                            </div>
                        )
                    }
                })()}

                <div className="row">
                    <div className="col-lg-12">
                        <button className="btn btn-lg btn-info float-right"
                                onClick={() => this.props.history.push('/admin/productsportal')}>
                            <i className="fa fa-plus-circle"></i>
                            Add New
                        </button>
                        <br/>
                        <br/>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="header-title mb-3">Product List</h4>
                                {(() => {
                                    if (this.props.location.state != undefined) {
                                        return (
                                            <div className="alert alert-success" role="alert">
                                                Successful.. New product Added Successfully.
                                            </div>
                                        )
                                    }
                                })()}
                                {(() => {
                                    if (this.state.deleted) {
                                        return (
                                            <div className="alert alert-success" role="alert">
                                                Successful.. product Deleted Successfully.
                                            </div>
                                        )
                                    }
                                })()}

                                <div className="table-responsive project-list">
                                    <table className="table project-table table-centered table-nowrap">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price ($)</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.allproducts.map((product, i) => (

                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{product.productName}</td>
                                                <td>{product.price}</td>
                                                <td>{product.qty}</td>
                                                <td>{product.category} </td>

                                                <td>
                                                    <img src={'/uploads/' + product.imagePath} alt={product.productName}
                                                         width="40" height="40"></img>
                                                </td>
                                                <td>
                                                    <div className="action">
                                                        <a href=""
                                                           onClick={() => this.props.history.push(`/admin/editproduct/${product.id}`)}
                                                           className="text-success mr-4" data-toggle="tooltip"
                                                           data-placement="top" title="" data-original-title="Edit">
                                                            <i className="fa fa-pencil h5 m-0" title="Edit"></i>
                                                        </a>
                                                        <a onClick={() => this.confirmDelete(product.id, i)}
                                                           className="text-danger" data-toggle="tooltip"
                                                           data-placement="top" title="" data-original-title="Close">
                                                            <i className="fa fa-remove h5 m-0" title="Inactive"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProductList);