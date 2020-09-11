import React, {Component} from "react";
import axios from "axios";
import Config from "../../config";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import '../../assets/css/login.css';

class AddAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: JSON.parse(localStorage.getItem("authToken"))
        };
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        if (this.state.password == this.state.password_retype)
            this.addAdmin(this.state)
        else {
            toast.error('Both Passwords must be same!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }


        // console.log(this.state)
    }

    addAdmin(user) {

        axios.post(Config.BASE_URL + '/admin', {
            email: user.email,
            password: user.password,
            name: user.name
        }, {
            headers: {
                "x-jwt-token": this.state.token,
            }
        }).then(response => {
            // toast.success('New Admin added successfully!', {
            //     position: "bottom-right",
            //     autoClose: 5000,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });
            this.props.history.push('/admin/adminlist',
                {isNew: true});

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
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <br/>
                <br/>
                <div className="d-flex justify-content-center ">
                    <div className="card dark-background" style={{width: "500px"}}>
                        <div className="card-header">
                            <h3>Add New Admin <i className="fa fa-user"></i></h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.myChangeHandler}
                                           name="name" placeholder="Name" required/>

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.myChangeHandler}
                                           name="email" placeholder="Email" required/>

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" onChange={this.myChangeHandler}
                                           name="password" placeholder="password" required/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" onChange={this.myChangeHandler}
                                           name="password_retype" placeholder="Re-type Password" required/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-warning float-right">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    toPage(path) {
        // alert("came")
        this.props.history.push(path);
    }
}

export default AddAdmin;