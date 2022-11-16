import React from "react";
import { fireEvent, screen, render } from "@testing-library/react";
import SearchForm from "../../components/SearchForm";

describe("SearchForm", () => {
  const validProps = {
    handleSearch: jest.fn(),
    placeHolder: "placeholder",
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <SearchForm
        handleSearch={validProps.handleSearch}
        placeholder={validProps.placeHolder}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("including placeHolder", () => {
    beforeEach(() => {
      render(
        <SearchForm
          handleSearch={validProps.handleSearch}
          placeholder={validProps.placeHolder}
        />
      );
    });

    test("renders correctly", () => {
      const { getByRole } = screen;
      const button = getByRole("button");
      const input = getByRole("textbox");

      expect(button).toHaveTextContent(/search/i);
      expect(button).toHaveAttribute("type", "submit");
      expect(input).toBeInTheDocument();
      expect(input.value).toBe("");
      expect(input).toHaveAttribute("placeholder", validProps.placeHolder);
    });

    test("inputs", async () => {
      const { getByRole } = screen;
      const button = getByRole("button");
      const input = getByRole("textbox");
      const string = "string";

      fireEvent.change(input, { target: { value: string } });
      expect(input.value).toBe(string);
      fireEvent.click(button);
      expect(validProps.handleSearch).toBeCalledWith(string);
      expect(input.value).toBe("");
    });

    test("can press enter in search input to search", () => {
      const { getByRole } = screen;
      const input = getByRole("textbox");
      const string = "string";

      fireEvent.change(input, { target: { value: string } });
      expect(input.value).toBe(string);
      fireEvent.keyDown(input, { code: "Enter", charCode: 13 });
      expect(validProps.handleSearch).toBeCalledWith(string);
      expect(input.value).toBe("");
    });
  });

  describe("exluding placeholder", () => {
    beforeEach(() => {
      render(<SearchForm handleSearch={validProps.handleSearch} />);
    });

    test("renders correctly without placeholder", () => {
      const { getByRole } = screen;
      const input = getByRole("textbox");

      expect(input).toHaveAttribute("placeholder", "");
    });
  });
});
