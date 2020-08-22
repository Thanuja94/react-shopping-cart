import React, { Component } from "react";
import SignUp from "../components/admin/SignUp";
import Login from "./../components/common/Login";
import Orders from "./../components/admin/Orders";

export default class AdminPortal extends Component {
  render() {
    return (
      <div>
          <Login />
          <SignUp/>
          <Orders />
      </div>
    );
  }
}
