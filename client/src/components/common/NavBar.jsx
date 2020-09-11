import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
    state = {};
    render() {
        return (
            <nav className="navbar" style={{background:"#FFC312",color:"white"}}>
                <Link to="/">Store</Link>
                <Link to="/admin/home">Admin</Link>
            </nav>
        );
    }
}

export default NavBar;