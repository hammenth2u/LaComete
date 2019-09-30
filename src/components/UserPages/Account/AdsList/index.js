import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

import Ad from 'src/components/AdPages/Ad';

const MyAds = () => {

  return (
    <div className="Account">
      <h1>Mes annonces</h1>
      
      {/* système de vue si favoris > 0 */}
      <section className="dreams">
        <h2>Mes rêves en cours</h2>

      </section>

      <section className="people">
        <h2>Mon profil</h2>
        
      </section>
      
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
export default MyAds;