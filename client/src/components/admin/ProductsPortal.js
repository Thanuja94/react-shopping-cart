import React, { Component } from "react";
import { withRouter } from 'react-router';
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class ProductsPortal extends Component {

    constructor(props) {
        super(props);

        this.handleinputChange = this.handleinputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    state = {
        productName: '',
        price: '',
        qty: '',
        category: '',
        imagePath: null
    };

    async componentDidMount() {

    }


    async handleSubmit() {

        let formData = new FormData();
        formData.append('imagePath', this.state.imagePath);
        formData.append('productName', this.state.productName);
        formData.append('qty', this.state.qty);
        formData.append('category', this.state.category);
        formData.append('price', this.state.price);

        let res = await axios.post('http://localhost:3000/api/products', formData);
        if (res.status === 200) {
            toast.success('Product added succesfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        } else {
            toast.error('Error adding product !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }

    }

    async handleinputChange(event) {

        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    handleFileUpload(event) {

        console.log(event.target.files[0])
        this.setState({ imagePath: event.target.files[0] });
    }

    render() {
        return (
            <div className="container">

                <br />
                <br />
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
                <br />
                <br />

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
                        <div className="card">
                            <div className="card-body">
                                <h1 className="header-title mb-3">Add a new product</h1>
                                <br />
                                <br />
                                <div >
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="inputEmail4">Product name</label>
                                            <input type="text" name="productName" onChange={this.handleinputChange} class="form-control" id="productName" required />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="inputPassword4">Price</label>
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">$</div>
                                                </div>
                                                <input type="number" class="form-control" name="price" onChange={this.handleinputChange} id="price" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label for="inputState">Category</label>
                                            <select id="inputState" class="form-control" name="category" onChange={this.handleinputChange} required>
                                                <option value="">Select a category</option>
                                                <option value="Mobile phones">Mobile phones</option>
                                                <option value="Laptops" >Laptops</option>
                                                <option value="Accessories" >Accessories</option>
                                                <option value="Smart watches" >Smart watches</option>
                                                <option value="Other" >Other</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-2">
                                            <label for="inputZip">Quantity</label>
                                            <input type="number" class="form-control" id="qty" name="qty" onChange={this.handleinputChange} required />
                                        </div>
                                        <div class="form-group col-md-6"></div>

                                        <div class="form-group mt-3">
                                            <label for="exampleFormControlFile1">Upload image</label>
                                            <input type="file" class="form-control-file" id="imagePath" name="imagePath" onChange={this.handleFileUpload} required />
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-primary float-right" onClick={this.handleSubmit} >Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProductsPortal);