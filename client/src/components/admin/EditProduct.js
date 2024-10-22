import React, {Component} from "react";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from "../../config";


class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    state = {
        paramId: '',
        productName: '',
        price: '',
        qty: '',
        category: '',
        imagePath: null,
        token: JSON.parse(localStorage.getItem("authToken"))
    };

    handleFileUpload(event) {

        console.log(event.target.files[0])
        this.setState({imagePath: event.target.files[0]});
    }

    async handleInputChange(event) {

        event.preventDefault();
        this.setState({[event.target.name]: event.target.value});
    }

    async componentDidMount() {
        const {id} = this.props.match.params

        await axios.get(Config.BASE_URL + `/products/${id}`, {
            headers: {
                "x-jwt-token": this.state.token,
            },
        }).then(response => {
            this.setState({isError: false})
            let data = response.data
            //  console.log(data);

            this.setState({
                paramId: id,
                productName: data.name,
                price: data.price,
                qty: data.qty,
                category: data.category,
                imagePath: data.imagePath
            });

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

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.handleUpdate(this.state)
    }

    async handleUpdate() {

        const {id} = this.props.match.params


        // let formData = new FormData();

        // let formData = {
        //     // 'imagePath':this.state.imagePath,
        //     'productName':this.state.productName,
        //     'qty':this.state.qty,
        //     'category':this.state.category,
        //     'price':this.state.price,
        // }
        // formData.set(data)

        // formData.append('imagePath', this.state.imagePath);
        // formData.append('productName', this.state.productName);
        // formData.append('qty', this.state.qty);
        // formData.append('category', this.state.category);
        // formData.append('price', this.state.price);

        console.log(this.state.imagePath)

        await axios.put(Config.BASE_URL + `/products/${id}`, {
            'productName': this.state.productName,
            'qty': this.state.qty,
            'category': this.state.category,
            'price': this.state.price,
        }, {
            headers: {
                "x-jwt-token": this.state.token,
            }
        }).then(response => {
            toast.success('Product Updated successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // this.props.history.push('/admin/adminlist');

        })
            .catch(err => {
                if (err.response) {
                    this.setState({isError: true, errorMsg: err.response.data.msg})
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
            <div className="container">
                {(() => {
                    if (this.state.isError) {
                        return (
                            <div>
                                <br/>
                                <div className="alert alert-danger" role="alert">
                                    Error occurred.. {this.state.errorMsg}
                                </div>
                            </div>

                        )
                    }
                })()}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <br/>
                <br/>
                <div className="d-flex justify-content-center ">
                    <div className="card dark-background" style={{width: "500px"}}>
                        <div className="card-header">
                            <h3>Update Product <i className="fa fa-edit"></i></h3>

                        </div>
                        <div className="card-body">
                            <div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-desktop"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.handleInputChange}
                                           name="productName" placeholder="Product Name" value={this.state.productName}
                                    />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-money"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.handleInputChange}
                                           name="price" placeholder="Price" value={this.state.price}/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-question"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.handleInputChange}
                                           name="qty" placeholder="Quentity" value={this.state.qty}/>

                                </div>

                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-laptop"></i></span>
                                    </div>
                                    <select className="form-control" name="category" onChange={this.handleInputChange}
                                    >
                                        <option value={this.state.category}>{this.state.category}</option>
                                        <option value="Mobile phones">Mobile phones</option>
                                        <option value="Laptops">Laptops</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Smart watches">Smart watches</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                {/*<div className="input-group form-group">*/}
                                {/*    <div className="input-group-prepend">*/}

                                {/*        <img src={'/uploads/' + this.state.imagePath} alt={this.state.productName}*/}
                                {/*             width="60" height="60"></img>*/}

                                {/*        <input type="file" className="form-control-file" id="imagePath" name="imagePath"*/}
                                {/*               onChange={this.handleFileUpload} required/>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                <div className="form-group">
                                    <button type="submit" className="btn btn-warning float-right"
                                            onClick={this.handleUpdate}>Update
                                    </button>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default EditProduct;