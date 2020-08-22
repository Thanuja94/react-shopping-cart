import React, {Component} from "react";
import '../../assets/css/login.css';
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            visibility: "hidden",
            isError: false
        };
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        this.checkAuth(this.state)

        // console.log(this.state)
    }

    async checkAuth(user) {

        await axios.post('http://localhost:3000/api/admin/auth', {
            email: user.username,
            password: user.password,
        }).then(response => {
            // do stuff
            this.setState({isError: false})
            console.log(response);
        })
            .catch(err => {
                if (err.response) {
                    this.setState({isError: true})
                    console.log(err.response)
                } else if (err.request) {
                    // client never received a response, or request never left
                } else {
                    // anything else
                }
            })
    }

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
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" name="username"
                                           onChange={this.myChangeHandler} placeholder="username"/>

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" name="password"
                                           onChange={this.myChangeHandler} placeholder="password"/>
                                </div>
                                {(() => {
                                    if (this.state.isError) {
                                        return (
                                            <div>
                                                <div className="d-flex justify-content-center links"
                                                     style={{color: "red"}}>
                                                    Username or Password is Incorrect.
                                                </div>
                                                <br/>
                                            </div>
                                        )
                                    }
                                })()}


                                <div className="form-group">
                                    {/*<input type="submit" value="Login" className="btn float-right login_btn"/>*/}
                                    <button type="submit" className="btn btn-warning float-right">Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?
                                <a href="" onClick={() => this.toSignUp('/signup')}> Sign Up </a>
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