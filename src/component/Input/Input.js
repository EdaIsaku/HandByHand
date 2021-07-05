import React from "react";
import "./Input.scss";

const Input = (type, id, placeHolder) => {
  return (
    <input
      className="form__input"
      type={type}
      id={id}
      placeholder={placeHolder}
    />
  );
};
export default Input;
