import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/DropDownMenu.css";
import menu from "../images/menu.png";
import OptionsMenu from "./OptionsMenu";
import useDelayedUnmount from "../hooks/useDelayedUnmount";

function DropDownMenu() {
  const [visible, setVisible] = useState(false);
  const mount = useDelayedUnmount(visible, 500);

  const handleHamburger = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <button
        type="button"
        className="drop-down-menu-button"
        onClick={handleHamburger}
      >
        <img src={menu} alt="hamburger menu" />
      </button>
      {mount && (
        <div
          className={`drop-down-menu ${
            visible ? "drop-down-menu__visible" : "drop-down-menu__hidden"
          }`}
          data-testid="drop-down-menu"
        >
          <OptionsMenu setVisible={setVisible} />
        </div>
      )}
    </>
  );
}

export default DropDownMenu;
