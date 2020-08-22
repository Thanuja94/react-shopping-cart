import React, { Component } from "react";
import Product from "./../components/client/Product";
import Cart from "./../components/client/Cart";
import data from "./../data.json";

export default class StorePortal extends Component {

    state = { products: data.products, cartItems: [] };
   
    render() {
        
        return (
            <div>
                <div className="content">
                    <div className="main">
                        <Product
                            products={this.state.products}
                            addToCart={this.addToCart}
                            removeFromCart = { this.removeFromCart }
                        ></Product>
                    </div>
                    <div className="sidebar">
                        <Cart cartItems={this.state.cartItems} />
                    </div>
                </div>
            </div>
        );
    }
    
    addToCart(product) {
        //let items = this.state.cartItems.slice();
        // let isAdded = false;
        // items.forEach((item)=>{
        //     if(item._id === product._id){
        //         item.count++;
        //         isAdded = true;
        //     } 
        //     if(!isAdded){
        //         items.push({...product, count: 1});
        //     }
        // })
        
        console.log('adding to cart ...')
    }

    removeFromCart(product) {
        console.log('removing from cart')
    }
}
