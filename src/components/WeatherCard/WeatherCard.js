import { weatherOptions } from "../../utils/WeatherOptions";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";
import "../App/App";
import { useContext } from "react";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = weatherOptions.find((i) => {
    return i.day === day && i.type === type;
  });
  const imageSrcUrl = imageSrc ? imageSrc.url : "";
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather__section">
      <div className="weather__temp">
        {weatherTemp}º{currentTemperatureUnit}
      </div>
      <img src={imageSrcUrl} className="weather__image" alt={type} />
    </section>
  );
};

export default WeatherCard;
