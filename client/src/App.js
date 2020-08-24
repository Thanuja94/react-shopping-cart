import React from "react";
// import "./index.css";
//import store from "./store";
//import { Provider } from "react-redux";
import {BrowserRouter, Route, Link} from "react-router-dom";
import AdminPortal from "./Portals/AdminPortal";
import StorePortal from "./Portals/StorePortal";
import SignUp from "./components/admin/SignUp";
import Footer from "./components/common/Footer";
import NavBar from "./components/common/NavBar";
import Home from "./components/admin/Home"
import Login from "./components/admin/Login"
import AdminList from "./components/admin/AdminList";


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="grid-container">
                    <NavBar/>
                    <main>
                        <Route path="/admin" component={AdminPortal} exact/>
                        <Route path="/" component={StorePortal} exact/>
                        {/*<Route path="/signup" component={SignUp} exact/>*/}
                        <Route path="/admin/home" component={Home} exact/>
                        <Route path="/admin/login" component={Login} exact/>
                        <Route path="/admin/signup" component={SignUp} exact/>
                        <Route path="/admin/adminlist" component={AdminList} exact/>
                    </main>
                    <Footer/>

                </div>
            </BrowserRouter>
        );
    }
}

export default App;
