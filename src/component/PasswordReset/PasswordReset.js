import "./PasswordReset.scss";
import React from "react";
import { useHistory } from "react-router";
import isLoadingHOC from "../isLoadingHOC";

const CostumLoader = () => {
  let history = useHistory();

  return (
    <div className="loader">
      <h1 className="loader__title">Now you can Sign In with your password.</h1>
      <input
        className="loader__button"
        type="button"
        value="Sign In"
        onClick={() => {
          history.push("/signIn");
        }}
      />
    </div>
  );
};

export default isLoadingHOC(CostumLoader);
