import React from "react";
import PropTypes from "prop-types";
import WeatherIcon from "react-icons-weather";
import "../styles/ForecastDailySummary.css";
import getUnits from "../helpers/getUnits";
import useUnitContext from "../hooks/useUnitContext";
import dateString from "../helpers/dateString";

function ForecastDailySummary({
  dateTime,
  weather,
  icon,
  temp,
  handleForecastSelect,
  selectedDate,
}) {
  const { units } = useUnitContext();
  const { tempUnits } = getUnits(units);
  const weatherDescription = weather ? weather.split(" ") : [weather];
  const date = dateString(dateTime);
  const dayOfTheWeek = date.slice(0, 3);
  const monthAndDay = date.slice(3, 10);

  return (
    <div
      className="forecast-daily-summary"
      data-testid="forecast-daily-summary"
    >
      <p>
        <span>{dayOfTheWeek}</span>
        <span className="forecast-daily-summary__line-break">
          {monthAndDay}
        </span>
      </p>
      <div className="forecast-daily-summary__icon" data-testid="forecast-icon">
        <WeatherIcon name="owm" iconId={icon} />
      </div>
      <p>
        <span>{weatherDescription[0]}</span>
        <span className="forecast-daily-summary__line-break">
          {weatherDescription[1]}
        </span>
      </p>
      <p>
        {temp}
        {tempUnits}
      </p>
      <button
        type="button"
        onClick={() => handleForecastSelect(dateTime)}
        className="forecast-daily-summary__more-details"
        disabled={selectedDate === dateTime}
      >
        More Details
      </button>
    </div>
  );
}

ForecastDailySummary.defaultProps = {
  selectedDate: 0,
};

ForecastDailySummary.propTypes = {
  dateTime: PropTypes.number.isRequired,
  weather: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  temp: PropTypes.string.isRequired,
  handleForecastSelect: PropTypes.func.isRequired,
  selectedDate: PropTypes.number,
};

export default ForecastDailySummary;
