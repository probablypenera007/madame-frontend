import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { zodiacSign } from "../../utils/zodiac";
import { madameOracleQuestions } from "../../utils/MadameOraclePhrase";
import { Link } from "react-router-dom";
import "./Main.css";

function Main({}) {
  const currentUser = useContext(CurrentUserContext);
  const [currentZodiac, setCurrentZodiac] = useState(zodiacSign[0]);
  const [zodiacIndex, setZodiacIndex] = useState(0);
  const oracleQuestionIndex = Math.floor(
    Math.random() * madameOracleQuestions.length
  );
  const [madameOracleQuestion, setMadameOracleQuestion] = useState(
    madameOracleQuestions[oracleQuestionIndex]
  );

  // console.log("Zodiac sign in Main: ", zodiacSign);
  // console.log("Madame Oracle Question in Main: ", madameOracleQuestions);

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
      <h1 className="main__title">{madameOracleQuestion}</h1>
      {currentZodiac.url && (
        <Link to="/profile">
          <div className="zodiac-display">
            <br />
            <img src={currentZodiac.url} className="zodiac__image" />
          </div>
        </Link>
      )}
    </main>
  );
}

export default Main;
