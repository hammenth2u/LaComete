import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

import './header.css';

const Header = ({ userStatus }) => {

  return (
    <div className="blog-header content--centered navbar">
      <a href="/">La Comète</a> 

      {userStatus == "<" ? (
        <div className="UnregisteredUserNav">
          <a href="/connexion">connexion</a> 
          <a href="/inscription">inscription</a>
        </div>
        ) : (              
          <div className="dropdown">
            <button className="dropbtn">Mon compte</button>
          
            <div className="dropdown-content">
              <a href="/mon-compte">Mon compte</a>          
              <a href="/mon-compte/mes-annonces">Mes Annonces</a>
              <a href="/mon-compte/mes-favoris">Mes Favoris</a>
              <a href="/mon-compte/parametres">Paramètres</a>
              <a href="/deconnexion">Déconnexion</a>
            </div>
          </div>
        )
      }  
    </div>
  );
};

/*
Header.propTypes = {
  
      userStatus: PropTypes.string.isRequired
};*/

export default Header;