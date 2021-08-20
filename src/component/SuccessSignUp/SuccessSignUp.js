import "./SuccessSignUp.scss";
import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import isLoadingHOC from "../isLoadingHOC";

const SuccessSignUp = () => {
  const handleSignOut = (ev) => {
    ev.preventDefault();
    auth
      .signOut()
      .then(() => {
        history.push("/");
        console.log("successfully signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let history = useHistory();

  return (
    <div className="success">
      <FaRegCheckCircle className="success__icon" />
      <h1 className="success__title">Congrats! All done.</h1>
      <p className="success__subtitle">
        Start your jorney and don't forget: No act of kindness, no matter how
        small, is ever wasted.
      </p>
      <hr className="success__rule"></hr>
      <Link to="/SignIn">
        <input
          className="success__button"
          type="button"
          value="Continue"
          onClick={handleSignOut}
        />
      </Link>
    </div>
  );
};
export default isLoadingHOC(SuccessSignUp);
