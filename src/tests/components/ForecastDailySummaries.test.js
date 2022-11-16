import React from "react";
import { render, screen } from "@testing-library/react";
import ForecastDailySummaries from "../../components/ForecastDailySummaries";
import { calcMean } from "../../helpers/calculateValues";
import dateString from "../../helpers/dateString";

describe("ForecastDailySummaries", () => {
  const validProps = {
    forecasts: [
      [
        {
          dateTime: 1667487600,
          icon: "200",
          temp: 10,
          weather: "unique1 weather1",
        },
        {
          dateTime: 2667554800,
          icon: "201",
          temp: 11,
          weather: "unique2 weather2",
        },
      ],
      [
        {
          dateTime: 1667898000,
          icon: "800",
          temp: 12,
          weather: "unique3 weather3",
        },
        {
          dateTime: 2667865600,
          icon: "801",
          temp: 13,
          weather: "unique4 weather4",
        },
      ],
      [
        {
          dateTime: 1677447600,
          icon: "600",
          temp: 14,
          weather: "unique5 weather5",
        },
        {
          dateTime: 2677554800,
          icon: "601",
          temp: 15,
          weather: "unique6 weather6",
        },
      ],
    ],
    handleForecastSelect: () => {},
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <ForecastDailySummaries
        forecasts={validProps.forecasts}
        handleForecastSelect={validProps.handleForecastSelect}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(
        <ForecastDailySummaries
          forecasts={validProps.forecasts}
          handleForecastSelect={validProps.handleForecastSelect}
        />
      );
    });

    test("ForecastDailySummary is called correct amount of times", () => {
      const { getAllByTestId } = screen;

      expect(getAllByTestId("forecast-daily-summary")).toHaveLength(
        validProps.forecasts.length
      );
    });

    test("data is properly manipulated", () => {
      const { queryByText } = screen;

      validProps.forecasts.forEach((forecast) => {
        const temp = calcMean(forecast, "temp");
        const date0 = dateString(forecast[0].dateTime).slice(4, 10);
        const description0 = forecast[0].weather.split(" ")[0];
        const date1 = dateString(forecast[1].dateTime).slice(4, 10);
        const description1 = forecast[1].weather.split(" ")[0];

        expect(queryByText(new RegExp(temp))).toBeInTheDocument();
        expect(queryByText(new RegExp(date0))).toBeInTheDocument();
        expect(queryByText(new RegExp(description0))).toBeInTheDocument();
        expect(queryByText(new RegExp(date1))).not.toBeInTheDocument();
        expect(queryByText(new RegExp(description1))).not.toBeInTheDocument();
      });
    });
  });
});
