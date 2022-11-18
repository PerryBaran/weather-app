import React from "react";
import PropTypes from "prop-types";
import WeatherIcon from "react-icons-weather";
import "../styles/ForecastTrihourlySummary.css";
import getUnits from "../helpers/getUnits";
import useUnitContext from "../hooks/useUnitContext";

function ForecastTrihourlySummary({ time, weather, icon, temp }) {
  const { units } = useUnitContext();
  const { tempUnits } = getUnits(units);
  const weatherDescription = weather ? weather.split(" ") : [weather];

  return (
    <div
      className="forecast-trihourly-summary"
      data-testid="forecast-trihourly-summary"
    >
      <p>{time}</p>
      {!icon || !weather || !temp ? (
        <p>
          No
          <span className="forecast-trihourly-summary__line-break">Data</span>
        </p>
      ) : (
        <>
          <div
            className="forecast-trihourly-summary__icon"
            data-testid="forecast-icon"
          >
            <WeatherIcon name="owm" iconId={icon} />
          </div>
          <p>
            {weatherDescription[0]}
            <span className="forecast-trihourly-summary__line-break">
              {weatherDescription[1]}
            </span>
          </p>
          <p>
            {temp.toFixed(1)}
            {tempUnits}
          </p>
        </>
      )}
    </div>
  );
}

ForecastTrihourlySummary.defaultProps = {
  icon: null,
  temp: null,
  weather: null,
};

ForecastTrihourlySummary.propTypes = {
  time: PropTypes.string.isRequired,
  icon: PropTypes.string,
  temp: PropTypes.number,
  weather: PropTypes.string,
};

export default ForecastTrihourlySummary;
