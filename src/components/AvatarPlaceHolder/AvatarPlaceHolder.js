import React from "react";
import { zodiacSign } from "../../utils/zodiac";
import "./AvatarPlaceHolder.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export const AvatarPlaceHolder = () => {
  const currentUser = React.useContext(CurrentUserContext);

  const getZodiacSign = (dob) => {
    if (!dob) return null;
    const [year, month, day] = dob.split('-').map(num => parseInt(num, 10));

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "Gemini";
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
    return "Invalid date/Unknown zodiac sign";
  };

  // Get the user's zodiac sign using their DOB
  const zodiacName = getZodiacSign(currentUser.dob);
  // Find the zodiac object that matches the zodiac name
  const zodiac = zodiacSign.find(sign => sign.name === zodiacName);

  return (
    <div className="avatar__placeholder">
      {zodiac ? <img className="avatar__zodiac"  src={zodiac.url} alt={zodiacName} /> : ''}
    </div>
  );
};

export default AvatarPlaceHolder;
