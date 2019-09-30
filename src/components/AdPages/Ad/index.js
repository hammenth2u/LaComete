import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const Ad = ({ adlist }) => {

  //console.log('ADLIST : ', adlist);

    const ads = adlist.map(ad => 
    <article key={ad.id}>     
      <h3>Title : { ad.title }</h3>
      <p>Category : { ad.type }</p>
      <p>Lieu : { ad.city }</p>
      <p>description : { ad.description }</p>
    </article> 
    );

      return (
        <div className="ad">
      
        <section>
          {ads}
        </section>
        <section className="comments">
          <p>ici un commentaire</p>
        </section>
  
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