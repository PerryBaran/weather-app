import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DropDownMenu from "../../components/DropDownMenu";

describe("DropDownMenu", () => {
  test("snapshot", () => {
    const { asFragment } = render(<DropDownMenu />);

    expect(asFragment()).toMatchSnapshot();
  });

  describe("tests", () => {
    beforeEach(() => {
      render(<DropDownMenu />);
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
