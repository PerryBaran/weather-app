import React from "react";
import { render, screen } from "@testing-library/react";
import LocationDetails from "../../components/LocationDetails";

describe("LocationDetails", () => {
  const validProps = {
    location: "Leeds, GB",
    errMessage: "Oopsies, an error",
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <LocationDetails location={validProps.location} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("no error message", () => {
    beforeEach(() => {
      render(<LocationDetails location={validProps.location} />);
    });

    test("correctly renders props", () => {
      const { getByText } = screen;

      expect(getByText(validProps.location)).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe("error message", () => {
    beforeEach(() => {
      render(
        <LocationDetails
          location={validProps.location}
          errMessage={validProps.errMessage}
        />
      );
    });
    test("if passed no falsey error message - renders that instead of location", () => {
      const { queryByText } = screen;

      expect(queryByText(validProps.errMessage)).toBeInstanceOf(
        HTMLHeadingElement
      );
      expect(queryByText(validProps.location)).not.toBeInTheDocument();
    });
  });
});
