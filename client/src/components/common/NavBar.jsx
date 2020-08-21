import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
    state = {};
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light" style={{background:"#FFC312"}}>
                <a className="navbar-brand" href="#">E-Shopping</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/products" className="nav-link" >Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link" >Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link" >About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link" >Contact</Link>
                        </li>
                        <li className="nav-item pull-right">
                            <Link to="/admin" className="nav-link" >Admin</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;