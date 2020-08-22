import React, { Component } from "react";
import Product from "./../components/client/Product";
import Cart from "./../components/client/Cart";
import data from "./../data.json";
import { LocalStorageService } from "../services/localstorage_service";
import axios from "axios";

export default class StorePortal extends Component {
    constructor() {
        super();    
        this.state = {
            products: data.products,
            cartItems: []
        };
    }
    addToCart = (product) => {

        const cartItems = this.state.cartItems.slice();
        let isAdded = false;
        cartItems.forEach((item)=>{
            if(item._id === product._id){
                item.count++;
                isAdded = true;
            } 
            
        })
        if(!isAdded){
            cartItems.push({...product, count: 1});
        }

        this.setState({cartItems});
        LocalStorageService.save(cartItems);

    }
    removeFromCart = (product)=> {
        console.log('removing from cart')
    }

    render() {

        return (
            <div>
                <div className="content">
                    <div className="main">
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

    async componentDidMount(){
        let {data} = await axios.get('http://localhost:3000/api/products');
        console.log(data);

        let StoreProducts = data.map((product) =>
        {
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
