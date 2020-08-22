import React from "react";
import "./index.css";
//import store from "./store";
//import { Provider } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import AdminPortal from "./Portals/AdminPortal";
import StorePortal from "./Portals/StorePortal";
import SignUp from "./components/admin/SignUp";
import Footer from "./components/common/Footer";
import NavBar from "./components/common/NavBar";


class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <div className="grid-container">
            <NavBar/>
            <Footer/>
            <main>
              <Route path="/admin" component={AdminPortal} />
              <Route path="/" component={StorePortal} exact />
              <Route path="/signup" component={SignUp} exact />
            </main>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
