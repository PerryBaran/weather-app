import React from "react";
import { render, screen } from "@testing-library/react";
import ForecastBreakdown from "../../components/ForecastBreakdown";

describe("ForecastBreakdown", () => {
  const validProps = {
    icon: "200",
    temp: "20",
    minTemp: "18",
    maxTemp: "22",
    humidity: "30",
    windSpeed: "40",
    weather: "cold",
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <ForecastBreakdown
        icon={validProps.icon}
        temp={validProps.temp}
        minTemp={validProps.minTemp}
        maxTemp={validProps.maxTemp}
        humidity={validProps.humidity}
        windSpeed={validProps.windSpeed}
        weather={validProps.weather}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(
        <ForecastBreakdown
          icon={validProps.icon}
          temp={validProps.temp}
          minTemp={validProps.minTemp}
          maxTemp={validProps.maxTemp}
          humidity={validProps.humidity}
          windSpeed={validProps.windSpeed}
          weather={validProps.weather}
        />
      );
    });

    test("correctly renders props", () => {
      const { getByText, getByTestId } = screen;

      expect(getByTestId("forecast-icon")).toContainHTML("i");
      expect(getByText(new RegExp(validProps.temp))).toBeInstanceOf(
        HTMLParagraphElement
      );
      expect(getByText(new RegExp(validProps.minTemp))).toBeInstanceOf(
        HTMLParagraphElement
      );
      expect(getByText(new RegExp(validProps.maxTemp))).toBeInstanceOf(
        HTMLParagraphElement
      );
      expect(getByText(new RegExp(validProps.humidity))).toBeInstanceOf(
        HTMLParagraphElement
      );
      expect(getByText(new RegExp(validProps.windSpeed))).toBeInstanceOf(
        HTMLParagraphElement
      );
    });

    test("it contains correct headings", () => {
      const { getByText } = screen;

      expect(getByText(/min:/i)).toBeInstanceOf(HTMLHeadingElement);
      expect(getByText(/max:/i)).toBeInstanceOf(HTMLHeadingElement);
      expect(getByText(/humidity:/i)).toBeInstanceOf(HTMLHeadingElement);
      expect(getByText(/wind speed:/i)).toBeInstanceOf(HTMLHeadingElement);
    });
  });
});
