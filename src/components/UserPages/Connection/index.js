import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const Connection = () => {

  return (
    <div className="connection">
      <h1>Connexion</h1>
      <form>
        <input value="E-mail" />
        <input value="Mot de passe" />
        <input type="submit" value="décollage" />
      </form>
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
export default Connection;