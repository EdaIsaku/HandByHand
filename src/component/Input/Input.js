import "./Input.scss";
import React from "react";

const Input = ({
  className,
  placeholder,
  name,
  id,
  type,
  handleInputChange,
  autocomplete,
  pattern,
  handleClick,
  value,
}) => {
  return (
    <input
      className={className}
      placeholder={placeholder}
      name={name}
      id={id}
      type={type}
      onChange={handleInputChange}
      autocomplete={autocomplete}
      pattern={pattern}
      onClick={handleClick}
      value={value}
    />
  );
};

export default Input;
