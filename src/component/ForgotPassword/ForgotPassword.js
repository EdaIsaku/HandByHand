import "./ForgotPassword.scss";
import React, { Fragment, useState } from "react";
import { auth } from "../../firebase";
import { useHistory } from "react-router";
import Error from "../Error/Error";

const ForgotPassword = () => {
  const [recoverEmail, setRecoverEmail] = useState("");
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  let history = useHistory();

  const handelInputChange = (ev) => {
    setRecoverEmail(ev.target.value);
    setError({
      isError: false,
      message: "",
    });
  };

  const handlePasswordReset = () => {
    auth
      .sendPasswordResetEmail(recoverEmail)
      .then(() => {
        history.push("/loader");
        console.log("Password reset email sent ");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setError({
            isError: true,
            message: error.message,
          });
        }
        if (error.code === "auth/user-not-found") {
          setError({
            isError: true,
            message: error.message,
          });
        }
      });
  };

  return (
    <Fragment>
      <div className="image"></div>
      <div className="reset">
        <h1 className="reset__title">Don't worry!</h1>
        <p className="reset__info">
          Enter the email associated with your account and we'll send an email
          with instructions to reset you password.
        </p>
        <input
          className="reset__input"
          type="email"
          placeholder="Email"
          onChange={handelInputChange}
        />
        <Error
          className="reset__error"
          value={error.message}
          error={error.isError}
        />
        <h3 className="reset__remember" onClick={() => history.push("/signIn")}>
          Wait, I remember my password!
        </h3>
        <input
          className="reset__submit"
          type="submit"
          value="Reset password"
          onClick={handlePasswordReset}
        />
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
