import React, { useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";
import mologo from "../../images/crystalballcolor.svg";
import MobileButton from "../../images/MobileButton.svg";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ZodiacAvatar from "../ZodiacAvatar/ZodiacAvatar";

function getCurrentZodiacSign() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "Gemini";
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  return "Invalid date/Unknown zodiac sign";
}

const Header = ({ isLoggedIn, onLogInModal, onRegisterModal, onAboutUs }) => {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img className="mologo" src={mologo} alt="logo" />
        </Link>
        <div className="header__date">
          {currentDate}, {getCurrentZodiacSign()} Season
        </div>
      </div>

      <nav className="header__navigation">
        <ul className="header__navigation-list" >
          <li className="header__navigation-item" >
            <button
              className="header__button-aboutus"
              type="button"
              onClick={onAboutUs}
            >
              About The Stars
            </button>
          </li>
          {!isLoggedIn && (
            <li className="header__navigation-item" >
              <button
                className="header__button-register"
                type="button"
                onClick={onRegisterModal}
              >
                Sign Up
              </button>
            </li>
          )}
        </ul>
      </nav>

      {isLoggedIn ? (
        <Link className="link__container" to="/profile">
          <h3 className="header__name">
            {currentUser && currentUser.name
              ? currentUser.name.charAt(0).toUpperCase() +
                currentUser.name.slice(1)
              : ""}
          </h3>
          <div>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                className="header__avatar-img"
                alt="avatar"
              />
            ) : (
              <ZodiacAvatar />
            )}
          </div>
        </Link>
      ) : (
        <Link to="/" className="header__login-link" onClick={onLogInModal}>
          Log In
        </Link>
      )}
    </header>
  );
};

export default Header;