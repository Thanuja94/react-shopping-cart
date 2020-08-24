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
                                            <th scope="col">Projects</th>
                                            <th scope="col">Start Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Team</th>
                                            <th scope="col">Progress</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>New admin Design</td>
                                            <td>02/5/2019</td>
                                            <td>
                                                <span className="text-success font-12"><i
                                                    className="mdi mdi-checkbox-blank-circle mr-1"></i> Completed</span>
                                            </td>
                                            <td>
                                                <div className="team">
                                                    <a href="javascript: void(0);" className="team-member"
                                                       data-toggle="tooltip" data-placement="top" title=""
                                                       data-original-title="Roger Drake">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                             className="rounded-circle avatar-xs" alt=""/>
                                                    </a>

                                                    <a href="javascript: void(0);" className="team-member"
                                                       data-toggle="tooltip" data-placement="top" title=""
                                                       data-original-title="Reggie James">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                             className="rounded-circle avatar-xs" alt=""/>
                                                    </a>

                                                    <a href="javascript: void(0);" className="team-member"
                                                       data-toggle="tooltip" data-placement="top" title=""
                                                       data-original-title="Gerald Mayberry">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar8.png"
                                                             className="rounded-circle avatar-xs" alt=""/>
                                                    </a>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0">Progress<span className="float-right">100%</span>
                                                </p>

                                                <div className="progress mt-2" style={{"height": "5px"}}>
                                                    <div className="progress-bar bg-success" role="progressbar"
                                                         style={{"width": "100%"}} aria-valuenow="100" aria-valuemin="0"
                                                         aria-valuemax="100"></div>
                                                </div>
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
                                            <td>Landing page Design</td>
                                            <td>04/6/2019</td>
                                            <td>
                                                <span className="text-primary font-12"><i
                                                    className="mdi mdi-checkbox-blank-circle mr-1"></i> Pending</span>
                                            </td>
                                            <td>
                                                <div className="team">
                                                    <a href="javascript: void(0);" className="team-member"
                                                       data-toggle="tooltip" data-placement="top" title=""
                                                       data-original-title="Deborah Mixon">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                             className="rounded-circle avatar-xs" alt=""/>
                                                    </a>

                                                    <a href="javascript: void(0);" className="team-member"
                                                       data-toggle="tooltip" data-placement="top" title=""
                                                       data-original-title="Scott Jessie">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                             className="rounded-circle avatar-xs" alt=""/>
                                                    </a>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0">Progress<span className="float-right">78%</span></p>

                                                <div className="progress mt-2" style={{"height": "5px"}}>
                                                    <div className="progress-bar bg-primary" role="progressbar"
                                                         style={{"width": "78%"}} aria-valuenow="78" aria-valuemin="0"
                                                         aria-valuemax="100"></div>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="action">
                                                    <a href="#" className="text-success mr-4" data-toggle="tooltip"
                                                       data-placement="top" title="" data-original-title="Edit"> <i
                                                        className="fa fa-pencil h5 m-0"></i></a>
                                                    <a href="#" className="text-danger" data-toggle="tooltip"
                                                       data-placement="top" title="" data-original-title="Close"> <i
                                                        className="fa fa fa-remove h5 m-0"></i></a>
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