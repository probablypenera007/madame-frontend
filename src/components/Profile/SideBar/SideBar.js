import React from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import "./SideBar.css";
import ZodiacAvatar from "../../ZodiacAvatar/ZodiacAvatar";

const SideBar = ({ onLogOut, onEditProfile, isLoggedIn, onSwitchToSaveReadings, onSwitchToOracleView, isOracleView }) => {
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
          <ZodiacAvatar name={currentUser.name} />
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
      {isOracleView ? (
              <button
              className="sidebar__button-saved"
              type="button"
              onClick={onSwitchToSaveReadings}
              >
                Saved Reading
              </button>
 
      ): (
        <button 
        className="sidebar__button-oracle"
        type="button"
        onClick={onSwitchToOracleView}>
          Talk To Oracle
        </button>
       
      )}
   
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
