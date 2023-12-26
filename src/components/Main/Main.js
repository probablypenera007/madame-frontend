import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { zodiacSign } from "../../utils/zodiac";
import { Link } from "react-router-dom";
import "./Main.css";

function Main({ weatherTemp, isDay }) {
  const currentUser = useContext(CurrentUserContext);
  const [currentZodiac, setCurrentZodiac] = useState({ name: '', symbol: '' })
  const [zodiacIndex, setZodiacIndex] = useState(0);

  useEffect(() => {
    const zodiacInterval = setInterval(() => {
      setZodiacIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % zodiacSign.length;
        setCurrentZodiac(zodiacSign[newIndex]);
        return newIndex;
      });
    }, 10000);

    return () => clearInterval(zodiacInterval);
  }, []);

  return (
    <main className="main">
      <h1 className="main__title"> Madame Oracle</h1>
     {currentZodiac.symbol && (
        <Link to="/profile">
          <div className="zodiac-display">{currentZodiac.name}<br/>{currentZodiac.symbol}</div>
        </Link>
      )}
    </main>
  );
}

export default Main;
