import React, {Component} from "react";
import {withRouter} from 'react-router';
import axios from "axios";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Config from "../../config";

class OrderList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        allOrders: []
    };

    async componentDidMount() {

        await axios.get('http://localhost:3000/api/orders/all-orders', {
            headers: {
                "x-jwt-token": JSON.parse(localStorage.getItem("authToken"))
            },
        }).then(response => {
            this.setState({isError: false})
            let data = response.data

            let orders = data.map((order) => {
                return {
                    id: order._id,
                    name: order.name,
                    total: order.total,
                    lat: order.lat,
                    long: order.long,
                    email: order.email,
                    cartItems: order.cartItems
                };
            });

            this.setState({allOrders: orders});

        }).catch(err => {
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
                        <br/>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="header-title mb-3">Orders Received</h4>
                                <div className="table-responsive project-list">
                                    <table className="table project-table table-centered table-nowrap">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            {/*<th scope="col">ID</th>*/}
                                            <th scope="col">Name</th>
                                            <th scope="col">Total</th>
                                            {/*<th scope="col">Latitude</th>*/}
                                            {/*<th scope="col">longitude</th>*/}
                                            <th scope="col">Email</th>
                                            <th scope="col">Action</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.allOrders.map((order, i) => (

                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                {/*<td>{order.id}</td>*/}
                                                <td>{order.name}</td>
                                                <td>{order.total}</td>
                                                {/*<td>{order.lat} </td>*/}
                                                {/*<td>{order.long} </td>*/}
                                                <td>{order.email} </td>
                                                <td>
                                                    <a href="#" onClick={() => this.props.history.push(`/admin/editproduct/${order.id}`)}
                                                       className="text-info" data-toggle="tooltip"
                                                       data-placement="top" title="" data-original-title="Close">
                                                        <i className="fa fa-eye h5 m-0" title="View Order"></i>
                                                    </a>
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

export default withRouter(OrderList);