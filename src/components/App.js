import React, { Component } from "react";
import "../styles/App.css";

import { isAuthenticated } from "../utils";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import Home from "./Home";
import PageNotFound from "./PageNotFound";

import { Switch, Route, Redirect } from "react-router-dom";

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const UnauthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() === false ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <UnauthenticatedRoute exact path="/login" component={LoginForm} />
          <UnauthenticatedRoute exact path="/signup" component={SignupForm} />
          <AuthenticatedRoute exact path="/" component={Home} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
