import React, { Component } from "react";
import Product from "./../components/client/Product";
import Cart from "./../components/client/Cart";
import data from "./../data.json";
import axios from "axios";
import CurrencyConverter from "../components/client/CurrencyConverter";
import { ToastContainer, toast } from 'react-toastify';

export default class StorePortal extends Component {
    constructor() {
        super();
        this.state = {
            products: data.products,
            cartItems: JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [],
            currency: ''
        };
    }
    addToCart = (product) => {

        const cartItems = this.state.cartItems.slice();
        let isAdded = false;
        cartItems.forEach((item) => {
            if (item.id == product.id) {
                item.count++;
                isAdded = true;
            }
        });

        if (!isAdded) {
            cartItems.push({ ...product, count: 1 });
        }

        this.setState({ cartItems });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

    }
    removeFromCart = (product) => {
       const cartItems = this.state.cartItems.slice(); 
       this.setState({
       cartItems : cartItems.filter((x)=>x.id !== product.id), //get raid of current product that has selected
       });
       
    };

    convertCurrency = async (event) => {

        this.setState({ currency: event.target.value });
        let currencySymbol = event.target.value;
        let { data } = await axios.get('https://api.exchangeratesapi.io/latest?symbols=USD,' + event.target.value);
        let convertedPrice = data.rates[Object.keys(data.rates)[1]];

        await this.getAllProducts();

        if (convertedPrice) {

            let products = this.state.products;
            console.log(this.state.products);
            products.forEach((product) => {
                product.price = Math.round(product.price * convertedPrice);
                product.currencySymbol = currencySymbol;
            });

            this.setState({ products: products });
        }
    }

    createOrderPost = async (order) => {

        let res = await axios.post('http://localhost:3000/api/orders', order);
        if (res.status === 200) {
            toast.success('order created succesfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Error creating !', {
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


    render() {

        return (
            <div>
                <div className="content">
                    <div className="main">
                        <CurrencyConverter
                            currency={this.state.currency}
                            convertCurrency={this.convertCurrency}
                        />
                        <Product
                            products={this.state.products}
                            addToCart={this.addToCart}
                           
                        ></Product>
                    </div>
                    <div className="sidebar">

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
                        <Cart cartItems={this.state.cartItems} createOrderPost={this.createOrderPost} removeFromCart={this.removeFromCart}/>
                    </div>
                </div>
            </div>
        );
    }

    async componentDidMount() {
        await this.getAllProducts();
    }

    async getAllProducts() {

        let { data } = await axios.get('http://localhost:3000/api/products');

        let StoreProducts = data.map((product) => {
            return {
                id: product._id,
                name: product.name,
                price: product.price,
                qty: product.qty,
                category: product.category,
                imagePath: product.imagePath,
                currencySymbol: 'USD'
            };
        });

        this.setState({ products: StoreProducts });
    }
}
