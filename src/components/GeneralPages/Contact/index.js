import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const Contact = () => {

  return (
    <div className="contact">

      <h1>Contactez-nous</h1>
      
      <h2>Formulaire de contact</h2>
      <form>
        <input value="Nom"/>
        <textarea value="Mon message" />
        <input type="submit" value="envoyer" />
      </form>

      <h2>Coordonnées</h2>
      <ul>
        <li>0102030405</li>
        <li>lacomete@oclock.io</li>
        <li>La Comète - 2ème étoile à droite puis tout droit jusqu'au matin</li>
      </ul>

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
export default Contact;