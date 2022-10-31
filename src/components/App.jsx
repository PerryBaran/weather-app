import React, { useState } from "react";
import "../styles/App.css";
import PropTypes from "prop-types";
import LocationDetails from "./LocationDetails";
import ForecastSummaries from "./ForecastSummaries";
import ForecastDetails from "./ForecastDetails";

function App(props) {
  const {
    data: { forecasts, location },
  } = props;
  const [selectedDate, setSelectedDate] = useState(forecasts[0].date);
  const selectedForecast = forecasts.find(
    (forecast) => forecast.date === selectedDate
  );

  const handleSetForecast = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="weather-app">
      <LocationDetails location={location} />
      <ForecastSummaries
        forecasts={forecasts}
        handleSetForecast={handleSetForecast}
      />
      <ForecastDetails forecast={selectedForecast} />
    </div>
  );
}

App.propTypes = {
  data: PropTypes.shape({
    forecasts: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.number,
        description: PropTypes.string,
        icon: PropTypes.string,
        temperature: PropTypes.shape({
          max: PropTypes.number,
          min: PropTypes.number,
        }),
      })
    ),
    location: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
    }),
  }).isRequired,
};

export default App;
