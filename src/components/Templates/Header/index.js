import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

import './header.css';

const Header = () => {

  return (
    <div className="blog-header content--centered">
        

        {/*TODO : système de vues user connected ou non */}
        
        <div className="navbar">
          <a href="/">La Comète</a> 
          <a href="#">connexion</a> 
          <a href="#">inscription</a>
        <div className="dropdown">
          <button className="dropbtn">Mon compte</button>
        <div className="dropdown-content">

          <a href="/mon-compte">Mon compte</a>          
          <a href="/mon-compte/mes-annonces">Mes Annonces</a>
          <a href="/mon-compte/mes-favoris">Mes Favoris</a>
          <a href="/mon-compte/parametres">Paramètres</a>
          <a href="/">Déconnexion</a>
        </div>
  </div> 
</div>
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
export default Header;