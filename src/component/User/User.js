import "./User.scss";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

import { SharedStateContext } from "../SharedState/SharedState";

const User = () => {
  console.log(auth.currentUser);
  const [sharedState, setSharedState] = useContext(SharedStateContext);
  const [init, setInit] = useState(() => {
    if (auth.currentUser) {
      let initial =
        auth.currentUser.displayName?.slice(0, 1).toUpperCase() || "";
      return initial;
    }
    return "";
  });
  const email = auth.currentUser.email;
  const userName = auth.currentUser.displayName;

  const handleUserClick = () => {
    setSharedState((prevState) => ({
      ...prevState,
      showInfo: !sharedState.showInfo,
    }));
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
        <span>{init}</span>
      </div>
      <div
        className="user"
        style={{ transform: sharedState.showInfo ? "scaleY(1)" : "scaleY(0)" }}
      >
        <div className="user__initials">
          <span>{init}</span>
        </div>
        <div className="user__info">
          <div className="user__fullName">{userName}</div>
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
