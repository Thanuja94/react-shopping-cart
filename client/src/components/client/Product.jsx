import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Config } from "./../../config";
import Modal from "react-modal";


class Product extends Component {
    state = {
        products: [{_id:122, imagePath: '16-166509_chester-bennington-full-hd.jpg', title:'winter is comming' }]
    };
    render() {
        return (
            <ul className="products">
              {this.state.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a
                      href={"#" + product._id}
                      onClick={() => this.openModal(product)}
                    >
                      <img src={'http://localhost:5000/uploads/' + product.imagePath} alt={product.title}></img>
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>23</div>
                      <button
                        onClick={() => this.addToCart(product)}
                        className="button primary"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
        );
    }

    addToCart(){
        console.log('adding to cart..')
    }
}

export default Product;