import React, { useRef } from "react";
import PropTypes from "prop-types";
import "../styles/SearchForm.css";

function SearchForm({ handleSearch }) {
  const searchRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchRef.current.value);
  };

  return (
    <div className="search-form">
      <input type="text" ref={searchRef} />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}

SearchForm.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchForm;
