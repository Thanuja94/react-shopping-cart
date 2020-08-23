import React, { Component } from "react";
import Product from "./../components/client/Product";
import Cart from "./../components/client/Cart";
import data from "./../data.json";
import { LocalStorageService } from "../services/localstorage_service";
import axios from "axios";
import CurrencyConverter from "../components/client/CurrencyConverter";
import Config from '../config';

export default class StorePortal extends Component {
    constructor() {
        super();
        this.state = {
            products: data.products,
            cartItems: JSON.parse(localStorage.getItem('cartItems'))? JSON.parse(localStorage.getItem('cartItems')) : [],
            currency: ''
        };
    }
    addToCart = (product) => {

        console.log(product)

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
        console.log('removing from cart')
    }

    convertCurrency = async (event) => {

        this.setState({ currency: event.target.value });

        let { data } = await axios.get('https://api.exchangeratesapi.io/latest?symbols=USD,' + event.target.value);
        let convertedPrice = data.rates[Object.keys(data.rates)[1]];

        await this.getAllProducts();

        if (convertedPrice) {

            let products = this.state.products;
            console.log(this.state.products);
            products.forEach((product) => {
                product.price = Math.round(product.price * convertedPrice);
            });

            this.setState({ products: products });
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
                            removeFromCart={this.removeFromCart}
                        ></Product>
                    </div>
                    <div className="sidebar">
                        <Cart cartItems={this.state.cartItems} />
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
                imagePath: product.imagePath
            };
        });

        this.setState({ products: StoreProducts });
    }
}
