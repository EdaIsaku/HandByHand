import "./SignIn.scss";
import React, { useState, useContext } from "react";
import Fade from "react-reveal/Fade";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import Input from "../Input/Input";
import Error from "../Error/Error";

import { SharedStateContext } from "../SharedState/SharedState";

const SignIn = () => {
  const [sharedState, setSharedState] = useContext(SharedStateContext);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  let history = useHistory();

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    if (name === "email") {
      setSharedState((prevState) => ({
        ...prevState,
        email: value,
      }));
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          email: {
            error: false,
            message: "",
          },
        };
      });
    } else {
      setPassword(value);
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: {
            error: false,
            message: "",
          },
        };
      });
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    auth
      .signInWithEmailAndPassword(sharedState.email.trim(), password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log("from signIn-Signed In", user);
        history.push("./map");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-email") {
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
        if (error.code === "auth/wrong-password") {
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
            <Input
              className="signIn__input"
              placeholder="Email"
              name="email"
              id="text"
              type="email"
              handleInputChange={handleInputChange}
            />
            <Error
              className="signUp__error"
              value={errors.email.message}
              error={errors.email.error}
            />
            <Input
              className="signIn__input"
              placeholder="Password"
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              autocomplete="new-password"
              pattern="^[a-zA-Z]+$"
              handleInputChange={handleInputChange}
            />
            <Error
              className="signUp__error"
              value={errors.password.message}
              error={errors.password.error}
            />
            <div className="signIn__toggle">
              <Input
                className="signIn__toggle__checkbox"
                id="showPassword"
                type="checkbox"
                handleClick={() => setShowPassword(!showPassword)}
              />
              <label className="signIn__toggle__label" for="showPassword">
                Show password
              </label>
            </div>
            <Input
              className="signIn__input-button"
              type="submit"
              value="Sign in"
              handleClick={handleSubmit}
            />
          </form>
          <p
            className="forgot__password"
            onClick={() => history.push("/forgotPassword")}
          >
            Forgot your password ?
          </p>
        </div>
      </Fade>
    </>
  );
};

export default SignIn;
