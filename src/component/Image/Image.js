import "./Image.scss";

import React from "react";

const Image = ({ src, handleImageRemove }) => {
  return (
    <div className="image">
      <img src={src} alt="img" />
      <span className="remove" onClick={handleImageRemove}>
        +
      </span>
    </div>
  );
};

export default Image;
