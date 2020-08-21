import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
    state = {};
    render() {
        return (
            <footer className="page-footer font-small blue" style={{position:"fixed",left:0,bottom: 0,
                width: "100%",
                textAlign: "center"}}>
                <div className="footer-copyright text-center py-3" style={{backgroundColor:"#FFC312"}}>© 2020 Copyright:
                    <a href=""> codefourr.com</a>
                </div>

            </footer>
        );
    }
}

export default Footer;