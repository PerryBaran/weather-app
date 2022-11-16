import React from "react";
import { render, screen } from "@testing-library/react";
import ForecastMoreDetails from "../../components/ForecastMoreDetails";
import dateString from "../../helpers/dateString";
import { calcMax, calcMean, calcMin } from "../../helpers/calculateValues";

describe("ForecastMoreDetails", () => {
  const forecasts = [
    {
      dateTime: 1667487600,
      dateTimeTxt: "2022-11-03 15:00:00",
      icon: "200",
      temp: 25,
      maxTemp: 22,
      minTemp: 27,
      humdidity: 29,
      weather: "light rain",
      windSpeed: 100,
    },
    {
      dateTime: 2667554800,
      dateTimeTxt: "2022-11-04 12:00:00",
      icon: "500",
      temp: 35,
      maxTemp: 32,
      minTemp: 37,
      humdidity: 39,
      weather: "broken clouds",
      windSpeed: 90,
    },
  ];

  test("snapshot", () => {
    const { asFragment } = render(
      <ForecastMoreDetails forecasts={forecasts} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(<ForecastMoreDetails forecasts={forecasts} />);
    });

    test("data is properly manipulated", () => {
      const { getByText } = screen;
      const date = dateString(forecasts[0].dateTime);
      const temp = calcMean(forecasts, "temp");
      const minTemp = calcMin(forecasts, "minTemp");
      const maxTemp = calcMax(forecasts, "maxTemp");
      const humidity = calcMean(forecasts, "humidity");
      const windSpeed = calcMean(forecasts, "windSpeed");

      expect(getByText(date)).toBeInstanceOf(HTMLHeadingElement);
      expect(getByText(new RegExp(temp))).toBeInTheDocument();
      expect(getByText(new RegExp(minTemp))).toBeInTheDocument();
      expect(getByText(new RegExp(maxTemp))).toBeInTheDocument();
      expect(getByText(new RegExp(humidity))).toBeInTheDocument();
      expect(getByText(new RegExp(windSpeed))).toBeInTheDocument();
    });
  });
});
