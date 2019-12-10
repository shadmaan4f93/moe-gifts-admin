import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const token = localStorage.getItem("token");
    let authenticated = token ? true : false;
    const { isPathExact } = rest;
    return (
        <React.Fragment>
            {authenticated ? <Route path={path} exact={isPathExact ? true : false} {...rest} component={Component} /> : <Redirect to="/login" />}
        </React.Fragment>
    )
}

export default PrivateRoute;