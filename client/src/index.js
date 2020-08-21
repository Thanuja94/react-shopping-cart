import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/main.css';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Route } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import Product from "./components/client/Product";
import Login from "./components/common/Login";
import SignUp from "./components/admin/SignUp";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
    <BrowserRouter>

        <NavBar />
        <Route exact path="/" component={Login} />
        <Route exact path="/products" component={Product} />
        <Route exact path="/admin" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />



        {/*<NavBar />*/}
        {/*/!*<Product />*!/*/}
        {/*/!*<Login />*!/*/}
        {/*<SignUp />*/}
        <Footer />
        {/*<Route exact path="/" component={Home} />*/}
        {/*<Route exact path="/heroes" component={Heroes} />*/}
        {/*<Route exact path="/heroes/:id" component={HeroDetails} />*/}
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
