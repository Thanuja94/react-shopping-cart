import axios from "axios";
import Config from "../../config";

class Auth {
    constructor() {
        this.authenticated = false
    }

    logIn(cb) {
        localStorage.setItem("authenticated", true);
        this.authenticated = true
        cb();
    }

    logOut(cb) {
        localStorage.setItem("authenticated", false);
        this.authenticated = false
        cb();
    }

    isAuthenticated() {
        this.checkAuth().then(response =>{
            localStorage.setItem("authenticated", true);
        }) .catch(err =>{
            localStorage.setItem("authenticated", false);
        })
    }


    checkAuth() {
        return axios.get(Config.BASE_URL + `/admin/isLoggedIn`, {
            headers: {
                "x-jwt-token": JSON.parse(localStorage.getItem("authToken"))
            }
        })
    }
}

export default new Auth()
