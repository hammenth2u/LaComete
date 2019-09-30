import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const AdTeaser = ({ adlist }) => {

  const ads = adlist.map(ad => 
    <article key={ad.id}>     
      <h3>Title : { ad.title }</h3>
      
    </article> 
    );

  return (
    <div className="ad">

      {ads}
      
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
export default AdTeaser;