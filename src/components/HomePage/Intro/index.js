import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';



const Intro = () => {

  return (
    <div className="introduction">
    <div className="halfmoon"></div>
      <section className="introtext">
        <p>Test de nouveau repo</p>
        <p>Vous avez un rêve fou ou un savoir-faire à exploiter?</p>
        <p>Venez proposer votre projet ou en chercher un auquel contribuer</p>
        <p>Et ensemble, faites vos plans sur notre comète !</p>
      </section>
      
      <section className="usermanual">
      <div className="halfmoongreen"></div>
      <div className="steps">
        <article>
          <p>J'ai un rêve / un talent</p>          
          <img src="https://image.flaticon.com/icons/svg/181/181374.svg"/>
        </article>
        <article>
        <p>Je poste mon annonce</p>
          <img src="https://image.flaticon.com/icons/svg/1792/1792058.svg"/>          
        </article>
        <article>
          <p>J'échange avec les autres rêveurs</p>
          <img src="https://image.flaticon.com/icons/svg/942/942796.svg"/>
        </article>
        <article>
          <p>Nous construisons notre projet</p>
          <img src="https://image.flaticon.com/icons/svg/1283/1283342.svg"/>          
        </article>
      </div>
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