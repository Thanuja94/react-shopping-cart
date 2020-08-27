import React, {Component} from "react";
// import '../../assets/css/login.css';

class AddAdmin extends Component {
    state = {};

    render() {
        return (
            <div className="container">
                <br/>
                <br/>
                <div className="d-flex justify-content-center ">
                    <div className="card dark-background" style={{width:"500px"}}>
                        <div className="card-header">
                            <h3>Add New Admin <i className="fa fa-user"></i></h3>
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
                                    <button type="submit" className="btn btn-warning float-right">Save</button>
                                </div>
                            </form>
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

export default AddAdmin;