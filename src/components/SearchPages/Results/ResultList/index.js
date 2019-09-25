import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

import Ad from 'src/components/SearchPages/Ad';

const ResultList = () => {

  return (
    <div className="adslist">
      
        <Ad /> 
        <Ad /> 
        <Ad /> 
        <Ad /> 
        <Ad /> 

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
export default ResultList;