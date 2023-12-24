// import WeatherCard from "../WeatherCard/WeatherCard";
// import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import React, { useMemo, useContext } from "react";
// import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AudioRecorder from "../../utils/testrecorder";



function Main({
  weatherTemp,
  isDay,
}) {
  const currentUser = useContext(CurrentUserContext);

  //const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  //const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 1000;

 

  return (
    <main className="main">
      <AudioRecorder/>
    </main>
  );
}

export default Main;
