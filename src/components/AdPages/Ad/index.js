import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const Ad = ({ title, category, city, description, need }) => {    

      return (
        <div className="ad">
      
          <section>
            <p>Annonce : </p>
            
            <article>     
              <h3>Title : { title }</h3>
              <p>Lieu : { city }</p>
              <p>Catégorie : { category }</p>
              <p>Description : { description }</p>
              <p>Recherche : { need }</p>
            </article> 
          </section>

          <section className="comments">
            
            <div>
              <h3>Commentaires : </h3>
            </div>
          </section>

        </div>
  )
};

/*
Ad.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  city:PropTypes.string.isRequired,
  description:PropTypes.string.isRequired,
  need:PropTypes.string.isRequired,
};
*/

export default Ad;