import React from "react";
import "../styles/ForecastDetails.css";
import PropTypes from "prop-types";
import ForecastTrihourlySummaries from "./ForecastTrihourlySummaries";
import ForecastBreakdown from "./ForecastBreakdown";
import { calcMean, calcMax, calcMin } from "../helpers/calculateValues";
import dateString from "../helpers/dateString";

function ForecastMoreDetails({ forecasts }) {
  const [{ dateTime, icon, weather }] = forecasts;
  const date = dateString(dateTime);
  const temp = calcMean(forecasts, "temp");
  const minTemp = calcMin(forecasts, "minTemp");
  const maxTemp = calcMax(forecasts, "maxTemp");
  const humidity = calcMean(forecasts, "humidity");
  const windSpeed = calcMean(forecasts, "windSpeed");

  return (
    <div className="forecast-details">
      <h2 className="forecast-details__heading">{date}</h2>
      <ForecastBreakdown
        icon={icon}
        temp={temp}
        minTemp={minTemp}
        maxTemp={maxTemp}
        humidity={humidity}
        windSpeed={windSpeed}
        weather={weather}
      />
      <ForecastTrihourlySummaries forecasts={forecasts} />
    </div>
  );
}

ForecastMoreDetails.propTypes = {
  forecasts: PropTypes.arrayOf(
    PropTypes.shape({
      dateTime: PropTypes.number,
      dateTimeTxt: PropTypes.string,
      icon: PropTypes.string,
      temp: PropTypes.number,
      maxTemp: PropTypes.number,
      minTemp: PropTypes.number,
      humidity: PropTypes.number,
      weather: PropTypes.string,
      windSpeed: PropTypes.number,
    })
  ).isRequired,
};

export default ForecastMoreDetails;
