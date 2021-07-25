import React from "react";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import Map from "../Map/Map";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./LogIn.scss";

const LogIn = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/">
            <SignIn />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default LogIn;
