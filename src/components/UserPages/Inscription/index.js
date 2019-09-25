import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const Inscription = () => {

  return (
    <div className="connection">
      <h1>Inscription</h1>
      <form>
        <input value="Nom" />
        <input value="Prénom" />
        <input value="Nom d'utilisateur" />
        <input value="Date de naissance" />
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
export default Inscription;