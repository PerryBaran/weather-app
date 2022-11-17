import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import mockData from "../data/forecastData.json";
import App from "../../components/App";

describe("App", () => {
  test("snapshot", () => {
    jest.spyOn(axios, "get").mockResolvedValue(mockData);
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("Search results rendered on app load ", async () => {
    jest.spyOn(axios, "get").mockResolvedValue(mockData);
    render(<App />);

    expect(await screen.findByText("Leeds, GB")).toBeInTheDocument();
  });
});
