import React from "react";
import "./index.css";
//import store from "./store";
//import { Provider } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import AdminPortal from "./Portals/AdminPortal";
import StorePortal from "./Portals/StorePortal";
import SignUp from "./components/admin/SignUp";


class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <Link to="/">Store</Link>
              <Link to="/admin">Admin</Link>
            </header>
            <main>
              <Route path="/admin" component={AdminPortal} />
              <Route path="/" component={StorePortal} exact />
              <Route path="/signup" component={SignUp} exact />
            </main>
            <footer>All right is reserved. Codefourr</footer>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
