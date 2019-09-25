import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const SearchBars = ({ handleChange }) => {

  return (
    <div>
        <input
        type="text"
        id="app-content"
        value="Type de rêve..."
        onChange={handleChange}
        />
        <input
        type="text"
        id="app-content"
        value="Galaxie à explorer..."
        onChange={handleChange}
        />
        <button>OK</button>
    </div>
  );
};

/*
Header.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};
*/
export default SearchBars;