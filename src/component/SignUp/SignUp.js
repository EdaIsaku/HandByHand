import "./SignUp.scss";
import React, { useState } from "react";
import SuccessSignUp from "../SuccessSignUp/SuccessSignUp";
import { FcGoogle } from "react-icons/fc";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { auth } from "../../firebase";
var provider = new firebase.auth.GoogleAuthProvider();

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signedUp, setIsSignedUp] = useState(false);

  const [errors, setErrors] = useState({
    username: {
      error: false,
      message: "",
    },
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
    confirmPassword: {
      error: false,
      message: "",
    },
  });

  const validateUsername = (username) => {
    if (username.length < 6) {
      setErrors({
        ...errors,
        username: {
          error: true,
          message: "Username should have at least 6 characters!",
        },
      });
    }
  };

  const validateEmail = (email) => {
    const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email) {
      setErrors({
        ...errors,
        email: {
          error: "error",
          message: "You must enter your email!",
        },
      });
    } else if (emailRegEx.test(email)) {
      setErrors({
        ...errors,
        email: {
          error: false,
          message: "",
        },
      });
    } else {
      setErrors({
        ...errors,
        email: {
          error: "error",
          message: "Invalid email address, please check.",
        },
      });
    }
  };

  const validatePassword = (password, confirmedPassword) => {
    if (!password) {
      setErrors({
        ...errors,
        password: {
          error: true,
          message: "Please fill with your password",
        },
      });
    } else if (password !== confirmedPassword) {
      setErrors({
        ...errors,
        password: {
          error: true,
          message: "Passwords don't match",
        },
        confirmPassword: {
          error: true,
          message: "",
        },
      });
    }
  };

  const validateData = () => {
    validateUsername(username);
    validateEmail(email);
    validatePassword(password, confirmPassword);
  };

  const handleInputChange = (ev) => {
    let { name, value } = ev.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      setConfirmPassword(value);
    }
  };

  // const clearState = () => {
  //   setEmail("");
  //   setPassword("");
  //   setConfirmPassword("");
  // };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateData(email, password, confirmPassword);
    auth
      .createUserWithEmailAndPassword(email.trim(), password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user);
        setIsSignedUp(true);
      })
      .catch((error) => {
        let { email, password, confirmPassword } = errors;
        console.log(error);

        if (error.code === "auth/email-already-in-use") {
          setErrors({
            ...errors,
            email: {
              error: true,
              message: error.message,
            },
          });
        } else if (error.code === "auth/weak-password") {
          setErrors({
            ...errors,
            password: {
              error: true,
              message: error.message,
            },
          });
        } else if (email.error) {
          setErrors({
            ...errors,
            email: {
              error: true,
              message: email.message,
            },
          });
        } else if (password.error) {
          setErrors({
            ...errors,
            password: {
              error: true,
              message: password.message,
            },
          });
        } else if (confirmPassword.error) {
          setErrors({
            ...errors,
            confirmPassword: {
              error: true,
              message: password.message,
            },
          });
        }
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
                <input
                  onChange={handleInputChange}
                  name="username"
                  className={`signUp__input ${
                    errors.username.error ? "signUp__input__error" : ""
                  }`}
                  type="text"
                  id="text"
                  placeholder="Username"
                />
                <p className="signUp__error">
                  <span
                    style={{
                      visibility: errors.username.error ? "visible" : "hidden",
                      border: "red",
                    }}
                  >
                    {`*${errors.username.message}`}
                  </span>
                </p>

                <input
                  onChange={handleInputChange}
                  name="email"
                  className={`signUp__input ${
                    errors.email.error ? "signUp__input__error" : ""
                  }`}
                  type="email"
                  id="text"
                  placeholder="Email"
                />
                <p className="signUp__error">
                  <span
                    style={{
                      visibility: errors.email.error ? "visible" : "hidden",
                      border: "red",
                    }}
                  >
                    {`*${errors.email.message}`}
                  </span>
                </p>

                <input
                  onChange={handleInputChange}
                  name="password"
                  className={`signUp__input ${
                    errors.password.error ? "signUp__input__error" : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  autocomplete="new-password"
                  pattern="^[a-zA-Z]+$"
                />
                <p className="signUp__error">
                  <span
                    style={{
                      visibility: errors.password.error ? "visible" : "hidden",
                    }}
                  >
                    {`*${errors.password.message}`}
                  </span>
                </p>

                <input
                  onChange={handleInputChange}
                  name="confirmPassword"
                  className={`signUp__input ${
                    errors.confirmPassword.error ? "signUp__input__error" : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm Password"
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
