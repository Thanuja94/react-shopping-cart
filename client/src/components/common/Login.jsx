import React, {Component} from "react";
import '../../assets/css/login.css';
import {Link} from "react-router-dom";

class Login extends Component {
    state = {};

    render() {
        return (
            <div className="container">
                <br/>
                <br/>
                <br/>
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fa fa-google"></i></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="username"/>

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="password"/>
                                </div>
                                <div className="row align-items-center remember">
                                    {/*<input type="checkbox">Remember Me </input>*/}
                                </div>
                                <div className="form-group">
                                    {/*<input type="submit" value="Login" className="btn float-right login_btn"/>*/}
                                    <button type="submit" className="btn btn-warning float-right">Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?
                                <a href="" onClick={() => this.toSignUp('/signup') }> Sign Up </a>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="#">Forgot your password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    toSignUp(path) {
        this.props.history.push(path);
    }
}

export default Login;