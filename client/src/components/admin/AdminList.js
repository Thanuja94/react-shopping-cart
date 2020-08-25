import React, {Component} from "react";
import {withRouter} from 'react-router';
import axios from "axios";
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

class AdminList extends Component {

    constructor(props) {
        super(props);

    }

    state = {
        allAdmins: [],
        rowNumber: 1,
        isError:false,
        errorMsg:'Internal Server Error!'
    };

    async componentDidMount() {

        await axios.get('http://localhost:3000/api/admin', {

        }).then(response => {
            this.setState({isError: false})
            let data=response.data

            let admins = data.map((admin) => {
                return {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    isActive: admin.isActive,
                };
            });

            this.setState({allAdmins: admins});
        })
            .catch(err => {
                if (err.response) {
                    let error=err.response
                    this.setState({isError: true,errorMsg:error.statusText})
                    console.log(err.response)
                } else if (err.request) {
                    // client never received a response, or request never left
                } else {
                    // anything else
                }
            })

    }

    submit = (adminId) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteAdmin(adminId)
                },
                {
                    label: 'No'
                }
            ]
        });
    };

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

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="header-title mb-3">Admin List</h4>
                                <div className="table-responsive project-list">
                                    <table className="table project-table table-centered table-nowrap">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Start Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.allAdmins.map((admin) => (

                                            <tr key={this.state.rowNumber}>
                                                <th scope="row">{this.state.rowNumber}</th>
                                                <td>{admin.name}</td>
                                                <td>{admin.email}</td>
                                                <td></td>
                                                <td>
                                                    {(() => {
                                                        this.state.rowNumber++;
                                                        if (admin.isActive == 1) {
                                                            return (
                                                                <span className="text-success font-12">
                                                            <i className="fa fa-check-circle mr-1"></i>
                                                            Active
                                                        </span>
                                                            )
                                                        } else {
                                                            return (
                                                                <span className="text-danger font-12">
                                                            <i className="fa fa-close mr-1"></i>
                                                            Inactive
                                                        </span>
                                                            )
                                                        }

                                                    })()}


                                                </td>

                                                <td>
                                                    <div className="action">
                                                        <a href="#" onClick={() => this.editAdmin(admin.id)}
                                                           className="text-success mr-4" data-toggle="tooltip"
                                                           data-placement="top" title="" data-original-title="Edit">
                                                            <i className="fa fa-pencil h5 m-0"></i>
                                                        </a>
                                                        <a href="#" onClick={() => this.submit(admin.id)}
                                                           className="text-danger" data-toggle="tooltip"
                                                           data-placement="top" title="" data-original-title="Close">
                                                            <i className="fa fa-remove h5 m-0"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    async editAdmin(adminId) {
        // alert(adminId)
    }

    async deleteAdmin(adminId) {
        alert(adminId)
        // this.submit();
    }

}

export default withRouter(AdminList);