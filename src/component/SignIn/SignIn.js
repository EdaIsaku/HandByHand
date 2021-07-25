import "./SignIn.scss";
import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  let history = useHistory();

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    auth
      .signInWithEmailAndPassword(email.trim(), password)
      .then((userCredential) => {
        var user = userCredential.user;
        setIsSignedIn(true);
        console.log("from signIn-Signed In", user, isSignedIn);
        history.push("./map");
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="logIn">
        <div className="logIn__card">
          <div className="logIn__title">HAND BY HAND</div>
          <div>
            <p className="logIn__question">Start you journey now!</p>
            <Link to="/signUp">
              <input className="logIn__button" type="button" value="Sign Up" />
            </Link>
          </div>
        </div>
      </div>
      <Fade left distance={"60px"}>
        <div className="signIn">
          <h1 className="signIn__title">Welcome back</h1>
          <form className="signIn__form" autocomplete="off">
            <input
              onChange={handleInputChange}
              className="signIn__input"
              type="email"
              id="text"
              placeholder="Email"
              name="email"
            />
            <input
              onChange={handleInputChange}
              className="signIn__input"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              autocomplete="new-password"
              pattern="^[a-zA-Z]+$"
            />
            <div className="signIn__toggle">
              <input
                className="signIn__toggle__checkbox"
                type="checkbox"
                id="showPassword"
                onClick={() => setShowPassword(!showPassword)}
              />
              <label className="signIn__toggle__label" for="showPassword">
                Show password
              </label>
            </div>
            <input
              className="signIn__input-button"
              onClick={handleSubmit}
              type="submit"
              value="Sign in"
            />
          </form>
        </div>
      </Fade>
    </>
  );
};

export default SignIn;
