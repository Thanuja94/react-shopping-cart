import React, {Component} from "react";
import '../../assets/css/home.css';
import {withRouter} from 'react-router';
import Auth from "./Auth";


class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <br/>
                <div className="col-md-12 pull-right">
                    <button className="btn btn-md btn-danger pull-right" onClick={() => this.logOut()}>Log Out</button>
                </div>
                <br/>
                <br/>
                <div className="row">

                    <div className="col-md-4 col-xl-4">
                        <div className="card bg-c-blue order-card">
                            <div className="card-block">
                                <h2 className="m-b-20">Orders Received</h2>
                                {/*<h2 className="text-right"><i*/}
                                {/*    className="fa fa-cart-plus f-left"></i><span>85</span></h2>*/}
                                {/*<p className="m-b-0">Completed Orders<span className="f-right">54</span></p>*/}

                            </div>
                            <div className="card-block">
                                <a href="#" className="small-box-footer text-white" onClick={() => this.toPage('/admin/vieworders')}>View all
                                    <i className="fa fa-eye float-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 col-xl-4">
                        <div className="card bg-c-green order-card">
                            <div className="card-block">
                                <h2 className="m-b-20">Total Products</h2>
                                {/*<h2 className="text-right"><i className="fa fa-shopping-bag f-left"></i><span>45</span>*/}
                                {/*</h2>*/}
                                {/*<p className="m-b-0">Products<span className="f-right">10</span></p>*/}
                            </div>
                            <div className="card-block">
                                <a href="#" className="small-box-footer text-white"
                                   onClick={() => this.toPage('/admin/productlist')}>View all
                                    <i className="fa fa-eye float-right"></i>

                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 col-xl-4">
                        <div className="card bg-c-yellow order-card">
                            <div className="card-block">
                                <h2 className="m-b-20">System Admins</h2>
                                {/*<h2 className="text-right"><i className="fa fa-user f-left"></i><span>5</span>*/}
                                {/*</h2>*/}
                                {/*<p className="m-b-0">new Admins<span className="f-right">2</span></p>*/}
                            </div>
                            <div className="card-block">
                                <a href="#" className="small-box-footer text-white"
                                   onClick={() => this.toPage('/admin/adminlist')}>View Admins
                                    <i className="fa fa-eye float-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    toPage(path) {
        this.props.history.push(path);
    }

    logOut() {
        localStorage.clear()
        Auth.logOut(() => {
                this.props.history.push("/admin")
            }
        )
    }
}

// export default Home;
export default withRouter(Home);