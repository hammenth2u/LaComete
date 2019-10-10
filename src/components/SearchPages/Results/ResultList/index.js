import React from 'react';
import PropTypes from 'prop-types';

import SearchBars from 'src/components/HomePage/SearchBars';

//import './styles.sass';

const ResultList = () => {

  return (
    <div className="adslist">      
      <SearchBars />
      <div></div>
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