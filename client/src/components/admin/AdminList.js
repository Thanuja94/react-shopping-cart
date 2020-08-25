import React, {Component} from "react";
import {withRouter} from 'react-router';

class AdminList extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="container-fluid">
                <br/>
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
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Buddhimal Gunasekara</td>
                                            <td>buddhimal@gmail.com</td>
                                            <td>02/5/2019</td>
                                            <td>
                                                <span className="text-success font-12"><i
                                                    className="mdi mdi-checkbox-blank-circle mr-1"></i> Active</span>
                                            </td>

                                            <td>
                                                <div className="action">
                                                    <a href="#" className="text-success mr-4" data-toggle="tooltip"
                                                       data-placement="top" title="" data-original-title="Edit"> <i
                                                        className="fa fa-pencil h5 m-0"></i></a>
                                                    <a href="#" className="text-danger" data-toggle="tooltip"
                                                       data-placement="top" title="" data-original-title="Close"> <i
                                                        className="fa fa-remove h5 m-0"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Buddhimal Gunasekara</td>
                                            <td>buddhimal@gmail.com</td>
                                            <td>02/5/2019</td>
                                            <td>
                                                <span className="text-success font-12"><i
                                                    className="mdi mdi-checkbox-blank-circle mr-1"></i> Active</span>
                                            </td>

                                            <td>
                                                <div className="action">
                                                    <a href="#" className="text-success mr-4" data-toggle="tooltip"
                                                       data-placement="top" title="" data-original-title="Edit"> <i
                                                        className="fa fa-pencil h5 m-0"></i></a>
                                                    <a href="#" className="text-danger" data-toggle="tooltip"
                                                       data-placement="top" title="" data-original-title="Close"> <i
                                                        className="fa fa-remove h5 m-0"></i></a>
                                                </div>
                                            </td>
                                        </tr>
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


}

export default withRouter(AdminList);