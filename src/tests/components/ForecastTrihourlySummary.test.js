import React from "react";
import { render, screen } from "@testing-library/react";
import ForecastTrihourlySummary from "../../components/ForecastTrihourlySummary";

describe("ForecastTrihourlySummary", () => {
  const validProps = {
    time: "15:00",
    icon: "200",
    temp: 34,
    weather: "broken clouds",
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <ForecastTrihourlySummary
        time={validProps.time}
        icon={validProps.icon}
        temp={validProps.temp}
        weather={validProps.weather}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("all data present", () => {
    beforeEach(() => {
      render(
        <ForecastTrihourlySummary
          time={validProps.time}
          icon={validProps.icon}
          temp={validProps.temp}
          weather={validProps.weather}
        />
      );
    });

    test("correctly renders props", () => {
      const { getByText, getByTestId } = screen;
      const description = validProps.weather.split(" ");

      expect(getByText(validProps.time)).toBeInTheDocument();
      expect(getByTestId("forecast-icon")).toContainHTML("i");
      expect(getByText(new RegExp(description[0]))).toBeInTheDocument();
      expect(getByText(new RegExp(description[1]))).toBeInTheDocument();
      expect(getByText(new RegExp(validProps.temp))).toBeInTheDocument();
    });
  });

  describe("missing data", () => {
    test("returns No Data if icon is undefined", () => {
      render(
        <ForecastTrihourlySummary
          time={validProps.time}
          temp={validProps.temp}
          weather={validProps.weather}
        />
      );
      const { getByText } = screen;

      expect(getByText(/no/i)).toBeInTheDocument();
      expect(getByText(/data/i)).toBeInTheDocument();
    });

    test("returns No Data if weather is undefined", () => {
      render(
        <ForecastTrihourlySummary
          time={validProps.time}
          temp={validProps.temp}
          icon={validProps.icon}
        />
      );
      const { getByText } = screen;

      expect(getByText(/no/i)).toBeInTheDocument();
      expect(getByText(/data/i)).toBeInTheDocument();
    });

    test("returns No Data if temp is undefined", () => {
      render(
        <ForecastTrihourlySummary
          time={validProps.time}
          icon={validProps.icon}
          weather={validProps.weather}
        />
      );
      const { getByText } = screen;

      expect(getByText(/no/i)).toBeInTheDocument();
      expect(getByText(/data/i)).toBeInTheDocument();
    });
  });
});
