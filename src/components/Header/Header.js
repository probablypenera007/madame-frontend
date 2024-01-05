import React, { useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";
import mologo from "../../images/crystalballcolor.svg";
import MobileButton from "../../images/MobileButton.svg";
import blackCloseButton from "../../images/blackCloseButton.svg";
//import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ZodiacAvatar from "../ZodiacAvatar/ZodiacAvatar";
import { useHistory } from "react-router-dom";

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

const Header = ({
  onCreateModal,
  weatherLocation,
  isLoggedIn,
  onLogInModal,
  onRegisterModal,
  onAboutUsClick,
}) => {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = React.useContext(CurrentUserContext);
  const history = useHistory();

  const handleAboutUsClick = () => {
    history.push("/aboutus");
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const zodiacSeason = getCurrentZodiacSign();

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img className="mologo" src={mologo} alt="logo" />
          </Link>
        </div>
        <div className="header__date">
          {currentDate}, {zodiacSeason} Season
        </div>
      </div>
      <div className="header__button-container">
      {/* <Link to="/aboutus" className="header___button-aboutus">
          About Us
        </Link> */}
 <button
          className="header___button-aboutus"
          type="button"
          onClick={handleAboutUsClick}
        >
          About Us
        </button>
        {!isLoggedIn && (
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
