import React, {useState} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";
import wtwrlogo from "../../images/wtwrlogo.svg";
import MobileButton from "../../images/MobileButton.svg";
import blackCloseButton from "../../images/blackCloseButton.svg" ;
//import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom";
import AvatarPlaceHolder from "../AvatarPlaceHolder/AvatarPlaceHolder";

const Header = ({
  onCreateModal,
  weatherLocation,
  isLoggedIn,
  onLogInModal,
  onRegisterModal,
}) => {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = React.useContext(CurrentUserContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={wtwrlogo} alt="logo" />
          </Link>
        </div>
        <div className="header__date">
          {currentDate}, {weatherLocation}
        </div>
      </div>

      <ToggleSwitch />
{/* 
      {!isMobileMenuOpened && (
      <button className="header__hamburger" onClick={toggleMobileMenu}>
           <img src={MobileButton} alt="mobile" />
      </button>
    )} */}
{/* 
<div className={`header__navigation ${isMobileMenuOpened ? 'header__navigation--open' : ''}`}> */}
      <div className="header__button-container">
        {isLoggedIn ? (
          <button
            className="header__button-addClothes"
            type="text"
            onClick={onCreateModal}
          >
            + Add Clothes
          </button>
        ) : (
          <button
            className="header__button-register"
            type="button"
            onClick={onRegisterModal}
          >
            Sign Up
          </button>
        )}
      </div>

      {isLoggedIn ? (
        <Link className="link__container" to="/profile">
          <h3 className="header__name">{currentUser.name}</h3>
          <div>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                className="header__avatar-img"
                alt="avatar"
              />
            ) : (
              <AvatarPlaceHolder />
            )}
          </div>
        </Link>
      ) : (
        <Link to="/" className="header__login-link" onClick={onLogInModal}>
          Log In
        </Link>
      )}
      {/* {isMobileMenuOpened && (
      <button className="header__close" onClick={toggleMobileMenu}>
      <img src={blackCloseButton} className="header__close-img" alt="mobile close"  />
      </button>
    )} */}

      {/* </div> */}



    </header>
  );
};

export default Header;
