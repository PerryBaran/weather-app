import React, { createContext, useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import * as useUnitContext from "../../hooks/useUnitContext";
import OptionsMenu from "../../components/OptionsMenu";

const findRadio = (radios, value) => {
  return radios.find((radio) => radio.value === value);
};

describe("OptionsMenu", () => {
  const validProps = {
    setVisible: jest.fn(),
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <OptionsMenu setVisible={validProps.setVisible} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(<OptionsMenu setVisible={validProps.setVisible} />);
    });

    test("all fields correctly rendered", () => {
      const { getByText, getAllByRole, getByRole } = screen;
      const radios = getAllByRole("radio");
      const standard = findRadio(radios, "standard");
      const metric = findRadio(radios, "metric");
      const imperial = findRadio(radios, "imperial");
      const apply = getByRole("button");

      expect(getByText(/options/i)).toBeInstanceOf(HTMLHeadingElement);
      expect(getByText(/units:/i)).toBeInstanceOf(HTMLHeadingElement);
      expect(radios).toHaveLength(3);
      expect(standard).toHaveAttribute("id", "standardRadio");
      expect(getByText(/scientific/i)).toHaveAttribute("for", "standardRadio");
      expect(metric).toHaveAttribute("id", "metricRadio");
      expect(getByText(/metric/i)).toHaveAttribute("for", "metricRadio");
      expect(imperial).toHaveAttribute("id", "imperialRadio");
      expect(getByText(/imperial/i)).toHaveAttribute("for", "imperialRadio");
      expect(apply).toHaveAttribute("type", "submit");
      expect(apply).toHaveTextContent(/apply/i);
    });

    test("apply button calls setVisible", () => {
      const { getByRole } = screen;
      const apply = getByRole("button");

      expect(validProps.setVisible).toBeCalledTimes(0);
      fireEvent.click(apply);
      expect(validProps.setVisible).toBeCalledWith(false);
    });
  });

  describe("mocked useContext", () => {
    let mockSetUnits;

    beforeEach(() => {
      mockSetUnits = jest.fn();
      const mockUnitContext = createContext({
        units: "metric",
        setUnits: mockSetUnits,
      });
      jest
        .spyOn(useUnitContext, "default")
        .mockImplementation(() => useContext(mockUnitContext));
      render(<OptionsMenu setVisible={validProps.setVisible} />);
    });

    test("selecting units", () => {
      const { getByRole, getAllByRole } = screen;
      const [standard, metric, imperial] = getAllByRole("radio");
      const apply = getByRole("button");

      fireEvent.click(standard);
      expect(standard).toBeChecked();
      expect(metric).not.toBeChecked();
      expect(imperial).not.toBeChecked();
      fireEvent.click(apply);
      expect(mockSetUnits).toBeCalledWith(standard.value);
      fireEvent.click(metric);
      expect(standard).not.toBeChecked();
      expect(metric).toBeChecked();
      expect(imperial).not.toBeChecked();
      fireEvent.click(apply);
      expect(mockSetUnits).toBeCalledWith(metric.value);
      fireEvent.click(imperial);
      expect(standard).not.toBeChecked();
      expect(metric).not.toBeChecked();
      expect(imperial).toBeChecked();
      fireEvent.click(apply);
      expect(mockSetUnits).toBeCalledWith(imperial.value);
    });
  });
});
