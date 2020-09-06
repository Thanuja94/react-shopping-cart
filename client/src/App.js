import React from "react";
// import React, { Component } from "react";
// import "./index.css";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import AdminPortal from "./Portals/AdminPortal";
import StorePortal from "./Portals/StorePortal";
import SignUp from "./components/admin/SignUp";
import Footer from "./components/common/Footer";
import NavBar from "./components/common/NavBar";
import Home from "./components/admin/Home"
import Login from "./components/admin/Login"
import AdminList from "./components/admin/AdminList";
import AddAdmin from "./components/admin/AddAdmin";
import ProductsPortal from "./components/admin/ProductsPortal";
import EditAdmin from "./components/admin/EditAdmin";
import ProductList from "./components/admin/ProductList";
import EditProduct from "./components/admin/EditProduct";
import UserPortal from "./Portals/UserPortal";
import axios from "axios";
import Config from "./config";
import PageNotfound from "./components/common/PageNotfound";
import Auth from "../src/components/admin/Auth"

import ProtectedRoute from "./components/admin/ProtectedRoute"


class App extends React.Component {
// export default class AdminPortal extends Component {

    constructor() {
        super();
        this.state = {
            loggedInStatus: false
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="grid-container">
                    <NavBar/>
                    <Switch>
                        {/*<Route path="/admin" component={AdminPortal} exact/>*/}
                        <Route path="/" component={StorePortal} exact/>
                        {/*<Route path="/signup" component={SignUp} exact/>*/}
                        <ProtectedRoute path="/admin/home" component={Home} exact/>
                        <ProtectedRoute path="/admin/login" component={Login} exact/>
                        <ProtectedRoute path="/admin/signup" component={SignUp} exact/>
                        <ProtectedRoute path="/admin/adminlist" component={AdminList} exact/>
                        <ProtectedRoute path="/admin/newadmin" component={AddAdmin} exact/>
                        <ProtectedRoute path="/admin/editadmin/:id" component={EditAdmin} exact/>
                        <ProtectedRoute path="/admin/editproduct/:id" component={EditProduct} exact/>
                        <ProtectedRoute path="/admin/productsportal" component={ProductsPortal} exact/>
                        <ProtectedRoute path="/admin/productlist" component={ProductList} exact/>
                        <ProtectedRoute path="/client/userportal/:id" component={UserPortal} exact/>
                        {/*<ProtectedRoute path="/admin" component={AdminPortal} exact/>*/}
                        <Route path="/admin" component={AdminPortal} exact/>
                        <Route component={PageNotfound}/>
                    </Switch>
                    <Footer/>

                </div>
            </BrowserRouter>
        );
    }
}

export default App;
