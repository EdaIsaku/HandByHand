import "./LogIn.scss";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import Map from "../Map/Map";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import PasswordReset from "../PasswordReset/PasswordReset";

const LogIn = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  });

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
            <Map isLoading={isLoading} />
          </Route>
          <Route path="/forgotPassword">
            <ForgotPassword />
          </Route>
          <Route path="/passwordReset">
            <PasswordReset isLoading={isLoading} />
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
