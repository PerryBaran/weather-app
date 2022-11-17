import React from "react";
import PropTypes from "prop-types";
import "../styles/TopBar.css";
import SearchForm from "./SearchForm";
import DropDownMenu from "./DropDownMenu";

function TopBar({ handleSearch, location }) {
  return (
    <div className="top-bar">
      <SearchForm handleSearch={handleSearch} placeholder={location} />
      <DropDownMenu />
    </div>
  );
}

TopBar.defaultProps = {
  location: "",
};

TopBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  location: PropTypes.string,
};

export default TopBar;
