import React from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import "./SideBar.css";
import AvatarPlaceHolder from "../../AvatarPlaceHolder/AvatarPlaceHolder";

const SideBar = ({ onLogOut, onEditProfile, isLoggedIn }) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className="sidebar">
      <div className="sidebar__content">
        {currentUser.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt="sidebar avatar icon"
          />
        ) : (
          <AvatarPlaceHolder name={currentUser.name} />
        )}
        <p className="sidebar__name">{currentUser.name}</p>
      </div>
      <button
        className="sidebar__button-edit"
        type="button"
        onClick={onEditProfile}
      >
        Change Profile Data
      </button>

      <button
        className="sidebar__button-logout"
        type="button"
        onClick={onLogOut}
      >
        Log out
      </button>
    </section>
  );
};

export default SideBar;
