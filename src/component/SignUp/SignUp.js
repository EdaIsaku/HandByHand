import "./SignUp.scss";
import React, { useState } from "react";
import SuccessSignUp from "../SuccessSignUp/SuccessSignUp";
import { FcGoogle } from "react-icons/fc";
import firebase from "firebase";
import { auth } from "../../firebase";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
var provider = new firebase.auth.GoogleAuthProvider();

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPaswword] = useState();
  const [signedUp, setIsSignedUp] = useState(false);

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPaswword(value);
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user);
        setIsSignedUp(true);
        console.log(signedUp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSubmit = (ev) => {
    ev.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        console.log(credential);
        var user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {signedUp ? (
        <SuccessSignUp />
      ) : (
        <>
          <div className="logIn">
            <div className="logIn__card">
              <div className="logIn__title">HAND BY HAND</div>
              <div>
                <p className="logIn__question">Already have an account?</p>
                <Link to="/signIn">
                  <input
                    className="logIn__button"
                    type="button"
                    value="Sign In"
                  />
                </Link>
              </div>
            </div>
          </div>
          <Fade right distance={"60px"} delay={10}>
            <div className="signUp">
              <h1 className="signUp__title">Create account</h1>
              <form className="signUp__form" autocomplete="off">
                <label className="signUp__label" for="text">
                  Email address
                </label>
                <input
                  onChange={handleInputChange}
                  name="email"
                  className="signUp__input"
                  type="email"
                  id="text"
                  placeholder="Enter your email"
                />
                <label className="signUp__label" for="password">
                  Set password
                </label>
                <input
                  onChange={handleInputChange}
                  name="password"
                  className="signUp__input"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter password"
                  autocomplete="new-password"
                  pattern="^[a-zA-Z]+$"
                />
                <label className="signUp__label" for="confirmPassword">
                  Confirm password
                </label>
                <input
                  className="signUp__input"
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm password"
                />
                <div className="signUp__toggle">
                  <input
                    className="signUp__toggle__checkbox"
                    type="checkbox"
                    id="showPassword"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <label className="signUp__toggle__label" for="showPassword">
                    Show password
                  </label>
                </div>
                <input
                  className="signUp__input-button"
                  type="submit"
                  value="Sign Up"
                  onClick={handleSubmit}
                />
              </form>
              <p className="signUp__paragraph">
                <hr className="signUp__rule" />
                <span className="signUp__span">or</span>
                <hr className="signUp__rule" />
              </p>
              <div className="signUp__google" onClick={handleGoogleSubmit}>
                <FcGoogle className="signUp__google__icon" />
                <input
                  className="signUp__google__button"
                  type="button"
                  value="Continue with Google"
                />
              </div>
            </div>
          </Fade>
        </>
      )}
    </>
  );
};

export default SignUp;
