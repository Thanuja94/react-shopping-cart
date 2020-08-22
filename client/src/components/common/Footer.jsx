import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
    state = {};
    render() {
        return (
            <footer className="page-footer font-small blue" style={{
                width: "100%",
                backgroundColor:"#FFC312",
                textAlign: "center"}}>
                <div className="footer-copyright text-center py-3" style={{backgroundColor:"#FFC312"}}>© 2020 Copyright:
                    <a href=""> codefourr.com</a>
                </div>

            </footer>
        // <footer>All right is reserved. Codefourr</footer>
        );
    }
}

export default Footer;