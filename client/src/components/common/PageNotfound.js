import React, { Component } from "react";
import { Link } from "react-router-dom";

class PageNotfound extends Component {
    state = {};
    render() {
        return (
            <div>
                <br/>
                <br/>
                <div className="container-fluid">
                    <div className="alert alert-danger" role="alert">
                        Error 404 Sorry..! Page not found..
                    </div>
                </div>
            </div>
        );
    }
}

export default PageNotfound;