import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

/**
 * import local
 */
import { CommentInput } from 'src/components/AdPages/CommentInput';

const Ad = ({ adlist }) => {

    const ads = adlist.map(ad => 
    <article key={ad.id}>     
      <h3>Titre : { ad.title }</h3>
      <p>Categorie : { ad.category }</p>
      <p>Lieu : { ad.city }</p>
      <p>Description : { ad.description }</p>
      <p>Recherche : { ad.need }</p>
    </article> 
    );

      return (
        <div className="ad">
      
          <section>
            {ads}
          </section>

          <section className="comments">
            <CommentInput />
            
            <div>
              <h3>Commentaires : </h3>
            </div>
          </section>

        </div>
  )
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