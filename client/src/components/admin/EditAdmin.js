import React, {Component} from "react";
import axios from "axios";
import Config from "../../config";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt from "jsonwebtoken";

// import '../../assets/css/login.css';

class EditAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            password_retype: null,
            email: '',
            name: '',
            is_active: '',
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
            this.updateAdmin(this.state)
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

    async componentDidMount() {

        const { id } = this.props.match.params

        await axios.get(`http://localhost:3000/api/admin/${id}`, {
            headers: {
                "x-jwt-token": this.state.token,
            },
        }).then(response => {
            let data = response.data

            console.log(data)

            this.setState({name: data.name,email:data.email});
        })
            .catch(err => {
                if (err.response) {
                    let error = err.response
                    this.setState({isError: true, errorMsg: error.data.msg})
                    console.log(err.response)
                } else if (err.request) {
                    // client never received a response, or request never left
                } else {
                    // anything else
                }
            })

    }

    updateAdmin(user) {

        const { id } = this.props.match.params

        axios.put(Config.BASE_URL + `/admin/${id}`, {
            email: user.email,
            password: user.password,
            name: user.name,
            isActive: user.is_active
        }, {
            headers: {
                "x-jwt-token": this.state.token,
            }
        }).then(response => {
            toast.success('Admin Updated successfully!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.props.history.push('/admin/adminlist');

        })
            .catch(err => {
                if (err.response) {
                    this.setState({isError: true, errorMsg: err.response.data})
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
            <div className="container-fluid">
                <br/>
                {(() => {
                    if (this.state.isError) {
                        return (
                            <div className="alert alert-danger" role="alert">
                                Error occurred.. {this.state.errorMsg}
                            </div>
                        )
                    }
                })()}
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
                            <h3>Edit Admin <i className="fa fa-edit"></i></h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.myChangeHandler}
                                           name="name" placeholder="Name" value={this.state.name} />

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.myChangeHandler}
                                           name="email" placeholder="Email" value={this.state.email} />

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" onChange={this.myChangeHandler}
                                           name="password" placeholder="password" />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" onChange={this.myChangeHandler}
                                           name="password_retype" placeholder="Re-type Password" />
                                </div>

                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-check-circle"></i></span>
                                    </div>
                                    <select id="is_active" name="is_active" className="form-control" onChange={this.myChangeHandler}>
                                        <option selected disabled> --Select Status--</option>
                                        <option value="true">Active</option>
                                        <option value="false">In-Active</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-warning float-right">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default EditAdmin;