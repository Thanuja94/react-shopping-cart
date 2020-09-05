import React from "react";
import {Route, Redirect} from "react-router-dom"
import Auth from "./Auth";


export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) => {
                Auth.isAuthenticated()
                if (JSON.parse(localStorage.getItem("authenticated")))
                    return <Component {...props}/>
                else
                    return <Redirect
                        to={
                            {
                                pathname: "/admin",
                                // pathname: "/",
                                state: props.location
                            }
                        }
                    />

            }

        }
        />
    )
}

export default ProtectedRoute;