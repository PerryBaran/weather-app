import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OptionsMenu from "../../components/OptionsMenu";

const findRadio = (radios, value) => {
  return radios.find((radio) => radio.value === value);
};

describe("OptionsMenu", () => {
  const validProps = {
    handleSearch: jest.fn(),
    setVisible: jest.fn(),
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <OptionsMenu
        handleSearch={validProps.handleSearch}
        setVisible={validProps.setVisible}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(
        <OptionsMenu
          handleSearch={validProps.handleSearch}
          setVisible={validProps.setVisible}
        />
      );
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

    test("selecting units", () => {
      const { getByRole, getAllByRole } = screen;
      const [standard, metric, imperial] = getAllByRole("radio");
      const apply = getByRole("button");

      fireEvent.click(standard);
      expect(standard).toBeChecked();
      expect(metric).not.toBeChecked();
      expect(imperial).not.toBeChecked();
      fireEvent.click(apply);
      expect(validProps.handleSearch).toBeCalledWith(undefined, standard.value);
      fireEvent.click(metric);
      expect(standard).not.toBeChecked();
      expect(metric).toBeChecked();
      expect(imperial).not.toBeChecked();
      fireEvent.click(apply);
      expect(validProps.handleSearch).toBeCalledWith(undefined, metric.value);
      fireEvent.click(imperial);
      expect(standard).not.toBeChecked();
      expect(metric).not.toBeChecked();
      expect(imperial).toBeChecked();
      fireEvent.click(apply);
      expect(validProps.handleSearch).toBeCalledWith(undefined, imperial.value);
    });

    test("apply button calls setVisible", () => {
      const { getByRole } = screen;
      const apply = getByRole("button");

      expect(validProps.setVisible).toBeCalledTimes(0);
      fireEvent.click(apply);
      expect(validProps.setVisible).toBeCalledWith(false);
    });
  });
});
