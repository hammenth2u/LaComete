import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';



const Intro = () => {

  return (
    <div className="introduction">
      <section className="introtext">
        <p>Vous avez un projet fou ou un savoir-faire à exploiter?</p>
        <p>Venez proposer votre rêve ou en chercher un auquel contribuer</p>
        <p>Et faites vos plans sur notre comète !</p>
      </section>

      <section className="usermanual">
        <p>Ici le mode d'emploi du site</p>
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
export default Intro;