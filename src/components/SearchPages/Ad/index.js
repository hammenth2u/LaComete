import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const Ad = () => {

  return (
    <div className="ad">

      <h1>Titre/Nom</h1>
      
      <p>Ici une belle description</p>

      <section className="comments">
        <p>ici un commentaire</p>
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
export default Ad;