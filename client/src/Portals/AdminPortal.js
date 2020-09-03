import React, { Component } from "react";
import SignUp from "../components/admin/SignUp";
import Login from "../components/admin/Login";
//import Orders from "./../components/admin/Orders";
import Home from "./../components/admin/Home";
import {Route} from "react-router-dom";


export default class AdminPortal extends Component {
  render() {
    return (
      <div>
          <Login />
          {/*<SignUp/>*/}
          {/*<Orders />*/}

      </div>
    );
  }
}
