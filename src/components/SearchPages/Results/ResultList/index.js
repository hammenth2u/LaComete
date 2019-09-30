import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

import AdTeaser from 'src/components/AdPages/AdTeaser';

const ResultList = () => {

  return (
    <div className="adslist">
      
        <AdTeaser /> 
        <AdTeaser /> 
        <AdTeaser /> 
        <AdTeaser /> 
        <AdTeaser /> 

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