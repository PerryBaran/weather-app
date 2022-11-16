import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ForecastDailySummary from "../../components/ForecastDailySummary";
import dateString from "../../helpers/dateString";

describe("ForecastDailySummary", () => {
  const validProps = {
    dateTime: 20,
    weather: "broken clouds",
    icon: "800",
    temp: "20",
    handleForecastSelect: jest.fn(),
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <ForecastDailySummary
        dateTime={validProps.dateTime}
        weather={validProps.weather}
        icon={validProps.icon}
        temp={validProps.temp}
        handleForecastSelect={validProps.handleForecastSelect}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(
        <ForecastDailySummary
          dateTime={validProps.dateTime}
          weather={validProps.weather}
          icon={validProps.icon}
          temp={validProps.temp}
          handleForecastSelect={validProps.handleForecastSelect}
        />
      );
    });

    test("correctly renders props", () => {
      const { getByText, getByTestId } = screen;
      const date = dateString(validProps.dateTime);
      const dayOfTheWeek = date.slice(0, 3);
      const monthAndDay = date.slice(4, 10);
      const description = validProps.weather.split(" ");

      expect(getByText(new RegExp(dayOfTheWeek))).toBeInTheDocument();
      expect(getByText(new RegExp(monthAndDay))).toBeInTheDocument();
      expect(getByTestId("forecast-icon")).toContainHTML("i");
      expect(getByText(new RegExp(description[0]))).toBeInTheDocument();
      expect(getByText(new RegExp(description[1]))).toBeInTheDocument();
      expect(getByText(new RegExp(validProps.temp))).toBeInTheDocument();
    });

    test("button", () => {
      const { getByText } = screen;
      const button = getByText(/more details/i);

      expect(button).toBeInstanceOf(HTMLButtonElement);
      expect(validProps.handleForecastSelect).toBeCalledTimes(0);
      fireEvent.click(button);
      expect(validProps.handleForecastSelect).toBeCalledTimes(1);
      expect(validProps.handleForecastSelect).toBeCalledWith(
        validProps.dateTime
      );
    });
  });
});
