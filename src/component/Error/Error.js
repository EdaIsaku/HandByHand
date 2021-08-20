import "./Error.scss";
import React from "react";

const Error = ({ className, value, error }) => {
  return (
    <p className={className}>
      <span
        style={{ border: "red", visibility: error ? "visible" : "hidden" }}
      >{`*${value}`}</span>
    </p>
  );
};
export default Error;
