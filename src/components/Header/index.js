import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const Header = () => {

  return (
    <header className="blog-header content--centered">
        <h1>La Comète</h1>

        {/*TODO : système de vues user connected ou non */}
        <ul>
            <li><a href="#">connexion</a></li>
            <li><a href="#">inscription</a></li>
        </ul>      
    </header>
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