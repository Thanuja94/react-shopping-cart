import React, {Component} from "react";
// import '../../assets/css/login.css';

class SignUp extends Component {
    state = {};

    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card dark-background">
                        <div className="card-header">
                            <h3>Sign Up</h3>

                        </div>
                        <div className="card-body">
                            <form>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Name"/>

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Email"/>

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="password"/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Re-type Password"/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-warning float-right">Sign Up</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Already have an account?
                                <a href="" onClick={() => this.toLogin('/admin/login') }> Login </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    toLogin(path) {
        // alert("came")
        this.props.history.push(path);
    }
}

export default SignUp;