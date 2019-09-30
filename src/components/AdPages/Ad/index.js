import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const Ad = ({ ads, author }) => {

  return (
    <div className="ad">
        {/*
        <h1>{ ads.title }</h1>
        <p>un rêve de { author }</p>
        <p>Lieu : { ad.location }</p>
        <p>{ ad.description }</p>
  
        <section className="comments">
          <p>ici un commentaire</p>
        </section>*/}
  
        </div>
  )
  /*
  const list = ads.map(function(ad) {

    return (
      <div className="ad">
  
        <h1>{ ad.title }</h1>
        <p>un rêve de { author }</p>
        <p>Lieu : { ad.location }</p>
        <p>{ ad.description }</p>
  
        <section className="comments">
          <p>ici un commentaire</p>
        </section>
  
      </div>
    );
  })  */
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
export default Ad;