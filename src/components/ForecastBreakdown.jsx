import React from "react";
import PropTypes from "prop-types";
import WeatherIcon from "react-icons-weather";
import getUnits from "../helpers/getUnits";
import useUnitContext from "../hooks/useUnitContext";
import "../styles/ForecastBreakdown.css";

function ForecastBreakdown({
  icon,
  temp,
  minTemp,
  maxTemp,
  humidity,
  windSpeed,
  weather,
}) {
  const { units } = useUnitContext();
  const { tempUnits, speedUnits } = getUnits(units);

  return (
    <div className="forecast-breakdown">
      <div className="forecast-breakdown__right">
        <div data-testid="forecast-icon">
          <WeatherIcon name="owm" iconId={icon} />
        </div>
        <p>{weather}</p>
      </div>
      <div className="forecast-breakdown__left">
        <p className="forecast-breakdown__temp">
          {temp}
          <sup>{tempUnits}</sup>
        </p>
        <div>
          <h4>Min: </h4>
          <p>
            {minTemp}
            {tempUnits}
          </p>
        </div>
        <div>
          <h4>Max: </h4>
          <p>
            {maxTemp}
            {tempUnits}
          </p>
        </div>
        <div>
          <h4>Humidity: </h4>
          <p>{humidity}%</p>
        </div>
        <div>
          <h4>Wind Speed: </h4>
          <p>
            {windSpeed}
            {speedUnits}
          </p>
        </div>
      </div>
    </div>
  );
}

ForecastBreakdown.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.string.isRequired,
  minTemp: PropTypes.string.isRequired,
  maxTemp: PropTypes.string.isRequired,
  humidity: PropTypes.string.isRequired,
  windSpeed: PropTypes.string.isRequired,
  weather: PropTypes.string.isRequired,
};

export default ForecastBreakdown;
