import React from "react";
import "./AvatarPlaceHolder.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export const AvatarPlaceHolder = () => {
  const currentUser = React.useContext(CurrentUserContext);

  const firstLetter = currentUser.name ? currentUser.name[0].toUpperCase() : "";

  console.log("value of currentUser in avatar placeholder: ", currentUser);
  console.log("value of firstLetter in avatar placeholder: ", firstLetter);
  return <div className="avatar__placeholder">{firstLetter}</div>;
};

export default AvatarPlaceHolder;
