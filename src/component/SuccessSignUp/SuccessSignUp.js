import "./SuccessSignUp.scss";
import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const SuccessSignUp = () => {
  return (
    <div className="success">
      <FaRegCheckCircle className="success__icon" />
      <h1 className="success__title">Congrats! All done.</h1>
      <p className="success__subtitle">
        Start your jorney and don't forget: No act of kindness, no matter how
        small, is ever wasted
      </p>
      <hr className="success__rule"></hr>
      <Link to="/signIn">
        <input className="success__button" type="button" value="Continue" />
      </Link>
    </div>
  );
};
export default SuccessSignUp;
