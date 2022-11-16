import React from "react";
import { render, screen } from "@testing-library/react";
import ForecastTrihourlySummaries from "../../components/ForecastTrihourlySummaries";

describe("ForecastTrihourlySummaries", () => {
  const forecasts = [
    {
      dateTime: 123,
      dateTimeTxt: "2022-11-03 15:00:00",
      icon: "200",
      temp: 12,
      maxTemp: 13,
      minTemp: 11,
      humidity: 44,
      weather: "really cold",
      windSpeed: 66,
    },
    {
      dateTime: 456,
      dateTimeTxt: "2022-11-03 18:00:00",
      icon: "500",
      temp: 22,
      maxTemp: 23,
      minTemp: 21,
      humidity: 45,
      weather: "less cold",
      windSpeed: 99,
    },
  ];

  test("snapshot", () => {
    const { asFragment } = render(
      <ForecastTrihourlySummaries forecasts={forecasts} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(<ForecastTrihourlySummaries forecasts={forecasts} />);
    });

    test("ForecastTrihourlySummary is called correct number of times, for every 3 hours for 1 day", () => {
      const { getAllByTestId, getByText } = screen;
      const FORECAST_INTERVAL = 3;
      const FORECASTS_PER_DAY = 24 / FORECAST_INTERVAL;

      expect(getAllByTestId("forecast-trihourly-summary")).toHaveLength(
        FORECASTS_PER_DAY
      );

      for (let i = 0; i < FORECASTS_PER_DAY; i += 1) {
        let time = `${i * FORECAST_INTERVAL}:00`;
        if (time.length === 4) time = `0${time}`;

        expect(getByText(time)).toBeInTheDocument();
      }
    });
  });
});
