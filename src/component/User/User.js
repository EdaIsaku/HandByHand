import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import "./User.scss";

import { InfoContext } from "../InfoContext/InfoContext";

const User = () => {
  const [showInfo, setShowInfo] = useContext(InfoContext);

  const name = "Eda";
  const lName = "Isaku";
  const email = "edaisaku@gmail.com";

  const handleUserClick = () => {
    setShowInfo((prevState) => !prevState);
  };

  const handleSignOut = (ev) => {
    auth
      .signOut()
      .then(() => {
        console.log("It should signOut from firestore");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="user__container">
      <div className="initials" onClick={handleUserClick}>
        <span>{name.slice(0, 1)}</span>
      </div>
      <div
        className="user"
        style={{ transform: showInfo ? "scaleY(1)" : "scaleY(0)" }}
      >
        <div className="user__initials">
          <span>{name.slice(0, 1)}</span>
        </div>
        <div className="user__info">
          <div className="user__fullName">
            {name} {lName}
          </div>
          <div className="user__email">{email}</div>
        </div>
        <hr className="ruler" />
        <Link to="/">
          <div className="user__button">
            <input type="button" value="Sign out" onClick={handleSignOut} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default User;
