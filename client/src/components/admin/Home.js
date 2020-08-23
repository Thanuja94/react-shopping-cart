import React, {Component} from "react";
import '../../assets/css/login.css';
import axios from "axios";
import Login from "./Login";
import { withRouter } from 'react-router';


class Home extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <h2>Hello</h2>

            </div>
        )

    }
}

// export default Home;
export default withRouter(Home);