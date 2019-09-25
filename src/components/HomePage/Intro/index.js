import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const Intro = () => {

  return (
    <div>
        <p>Ici la présentation du site</p>
        <p>Ici le mode d'emploi du site</p>
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
export default Intro;