import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DropDownMenu from "../../components/DropDownMenu";

describe("DropDownMenu", () => {
  const handleSearch = jest.fn();

  test("snapshot", () => {
    const { asFragment } = render(<DropDownMenu handleSearch={handleSearch} />);

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(<DropDownMenu handleSearch={handleSearch} />);
    });

    test("image", () => {
      const { getByAltText } = screen;
      const hamburgerImage = getByAltText("hamburger menu");

      expect(hamburgerImage).toHaveAttribute("src", "menu.png");
    });

    test("button", () => {
      const { getAllByRole, queryByTestId } = screen;
      const [hamburgerButton] = getAllByRole("button");
      let dropDownMenu = queryByTestId("drop-down-menu");

      expect(hamburgerButton).toHaveAttribute("type", "button");
      expect(dropDownMenu).not.toBeInTheDocument();
      fireEvent.click(hamburgerButton);
      dropDownMenu = queryByTestId("drop-down-menu");
      expect(dropDownMenu).toBeInTheDocument();
    });
  });
});
