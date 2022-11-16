/* eslint-disable no-console */
import axios from "axios";

const getForecast = async (
  setLocation,
  setForecasts,
  setSelectedDate,
  setErrMessage,
  location,
  units
) => {
  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&APPID=${process.env.REACT_APP_API_KEY}`;
  try {
    const response = await axios.get(endpoint);
    const {
      data: {
        city: { name, country },
        list,
      },
    } = response;

    const simplifyForecast = (forecast) => {
      const {
        dt: dateTime,
        dt_txt: dateTimeTxt,
        main: {
          temp,
          temp_min: minTemp,
          temp_max: maxTemp,
          humidity,
          pressure,
        },
        weather: [{ description: weather, id }],
        wind: { speed: windSpeed },
      } = forecast;

      return {
        dateTime,
        dateTimeTxt,
        icon: id.toString(),
        temp,
        minTemp,
        maxTemp,
        humidity,
        pressure,
        weather,
        windSpeed,
      };
    };

    const groupAndSimplifyForecast = (data) => {
      const groupedForecast = [];
      let daysForecast = [];

      data.forEach((forecast) => {
        const simplifiedForecast = simplifyForecast(forecast);

        if (daysForecast.length === 0) {
          daysForecast.push(simplifiedForecast);
        } else {
          const prevForecastDay =
            daysForecast[daysForecast.length - 1].dateTimeTxt.split(" ")[0];
          const forecastDay = simplifiedForecast.dateTimeTxt.split(" ")[0];

          if (forecastDay === prevForecastDay) {
            daysForecast.push(simplifiedForecast);
          } else {
            groupedForecast.push(daysForecast);
            daysForecast = [simplifiedForecast];
          }
        }
      });
      groupedForecast.push(daysForecast);

      return groupedForecast;
    };

    const forecasts = groupAndSimplifyForecast(list);

    setLocation(`${name}, ${country}`);
    setForecasts(forecasts);
    setSelectedDate(forecasts[0][0].dateTime);
    setErrMessage("");
  } catch (err) {
    const status = err.response?.request?.status;
    if (status === 404) {
      console.error("Invalid Location", err);
      setErrMessage("Could not find that city or town, please try again.");
    } else if (status === 429) {
      console.error("Too many API calls", err);
      setErrMessage("Too many requests made, please try again later.");
    } else if (
      status === 500 ||
      status === 502 ||
      status === 503 ||
      status === 504
    ) {
      console.error("Server Error", err);
      setErrMessage(
        "Oops, something went wrong with the server, please try again later."
      );
    } else {
      console.error("unexpected Error", err);
      setErrMessage(
        "Oops, something unexpected went wrong, please try again later."
      );
    }
  }
};

export default getForecast;
