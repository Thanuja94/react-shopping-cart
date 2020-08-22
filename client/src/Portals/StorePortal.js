import React, { Component } from "react";
import Product from "./../components/client/Product";
import Cart from "./../components/client/Cart";
import data from "./../data.json";

export default class StorePortal extends Component {
    constructor() {
        super();    
        this.state = {
            products: data.products,
            cartItems: []
        };
    }
    addToCart = (product) => {

        console.log(product)

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
        console.log(cartItems);

        this.setState({cartItems});

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
 
}
