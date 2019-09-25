import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const Account = () => {

  return (
    <div className="Account">
      <h1>Mon Compte</h1>
      
      <aside>
        <a>Mes Annonces</a>
        <a>Mes Favoris</a>
        <a>Paramètres</a>
      </aside>

      <section>
       <p> ??????? </p>
      </section>

      <button>x Retour à la réalité</button>
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
export default Account;