import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Route } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import Login from "./components/common/Login";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
    <BrowserRouter>
        <NavBar />
        <Login />
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
