import "./SignUp.scss";
import React, { useState } from "react";
import SuccessSignUp from "../SuccessSignUp/SuccessSignUp";
import { FcGoogle } from "react-icons/fc";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import Error from "../Error/Error";

import firebase from "firebase";
import { auth } from "../../firebase";
var provider = new firebase.auth.GoogleAuthProvider();

const SignUp = () => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleInputChange = (ev) => {
    let { name, value } = ev.target;
    if (name === "username") {
      setUsername(value);
      setErrors({
        ...errors,
        username: {
          error: false,
          message: "",
        },
      });
    } else if (name === "email") {
      setEmail(value);
      setErrors({
        ...errors,
        email: {
          error: false,
          message: "",
        },
      });
    } else if (name === "password") {
      setPassword(value);
      setErrors({
        ...errors,
        password: {
          error: false,
          message: "",
        },
      });
    } else {
      setConfirmPassword(value);
      setErrors({
        ...errors,
        password: {
          error: false,
          message: "",
        },
        confirmPassword: {
          error: false,
          message: "",
        },
      });
    }
  };

  const validateUsername = (username) => {
    if (username.length < 5) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          username: {
            error: true,
            message: "Username should have at least 5 characters!",
          },
        };
      });
      return false;
    } else {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          username: {
            error: false,
            message: "",
          },
        };
      });
      return true;
    }
  };

  const validateEmail = (email) => {
    const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let message = "";
    if (!email) {
      message = "You must enter your email!";
    }
    if (emailRegEx.test(email)) {
      message = "";
    } else {
      message = "Invalid email address, please check.";
    }
    if (message.length > 0) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          email: {
            error: true,
            message: message,
          },
        };
      });
      return false;
    } else {
      return true;
    }
  };

  const validatePassword = (password, confirmPassword) => {
    if (!password) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: {
            error: true,
            message: "Please fill with your password",
          },
          confirmPassword: {
            error: true,
            message: "",
          },
        };
      });
      return false;
    }
    if (password !== confirmPassword) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: {
            error: true,
            message: "Passwords don't match",
          },
          confirmPassword: {
            error: true,
            message: "",
          },
        };
      });
      return false;
    }

    if (errors.password.message.length > 0) {
      return false;
    } else {
      console.log("I was called");
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: {
            error: false,
            message: "",
          },
          confirmPassword: {
            error: false,
            message: "",
          },
        };
      });
      return true;
    }
  };

  const validateData = () => {
    let emailValid = validateEmail(email);
    let userNameValid = validateUsername(userName);
    let passwordValid = validatePassword(password, confirmPassword);
    console.log(passwordValid);
    if (emailValid && userNameValid && passwordValid) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (validateData()) {
      auth
        .createUserWithEmailAndPassword(email.trim(), password)
        .then((userCredential) => {
          var user = userCredential.user;
          user.updateProfile({
            displayName: userName,
          });
          setIsSignedUp(true);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setErrors((prevErrors) => {
              return {
                ...prevErrors,
                email: {
                  error: true,
                  message: error.message,
                },
              };
            });
          }
          if (error.code === "auth/weak-password") {
            setErrors((prevErrors) => {
              return {
                ...prevErrors,
                password: {
                  error: true,
                  message: error.message,
                },
              };
            });
          }
        });
    } else console.log(errors);
  };

  const handleGoogleSubmit = (ev) => {
    ev.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result) => {
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
                <Input
                  className={`signUp__input ${
                    errors.username.error ? "signUp__input__error" : ""
                  }`}
                  placeholder="Username"
                  name="username"
                  id="text"
                  type="text"
                  handleInputChange={handleInputChange}
                />
                <Error
                  className="signUp__error"
                  value={errors.username.message}
                  error={Boolean(errors.username.message)}
                />
                <Input
                  className={`signUp__input ${
                    errors.email.error ? "signUp__input__error" : ""
                  }`}
                  placeholder="Email"
                  name="email"
                  type="email"
                  id="text"
                  handleInputChange={handleInputChange}
                />
                <Error
                  className="signUp__error"
                  value={errors.email.message}
                  error={Boolean(errors.email.message)}
                />
                <Input
                  className={`signUp__input ${
                    errors.password.error ? "signUp__input__error" : ""
                  }`}
                  placeholder="Password"
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  handleInputChange={handleInputChange}
                  autocomplete="new-password"
                  pattern="^[a-zA-Z]+$"
                />
                <Error
                  className="signUp__error"
                  value={errors.password.message}
                  error={Boolean(errors.password.message)}
                />
                <Input
                  className={`signUp__input ${
                    errors.confirmPassword.error ? "signUp__input__error" : ""
                  }`}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  handleInputChange={handleInputChange}
                />
                <Error
                  className="signUp__error"
                  value={errors.confirmPassword.message}
                  error={Boolean(errors.confirmPassword.message)}
                />
                <div className="signUp__toggle">
                  <Input
                    className="signUp__toggle__checkbox"
                    id="showPassword"
                    type="checkbox"
                    handleClick={() => setShowPassword(!showPassword)}
                  />
                  <label className="signUp__toggle__label" for="showPassword">
                    Show password
                  </label>
                </div>
                <Input
                  className="signUp__input-button"
                  type="submit"
                  value="Sign Up"
                  handleClick={handleSubmit}
                />
              </form>
              <p className="signUp__paragraph">
                <hr className="signUp__rule" />
                <span className="signUp__span">or</span>
                <hr className="signUp__rule" />
              </p>
              <div className="signUp__google" onClick={handleGoogleSubmit}>
                <FcGoogle className="signUp__google__icon" />
                <Input
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
