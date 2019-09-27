import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const NewAdForm = () => {

  return (
    <div className="newadform">
      <h1>Créer une nouvelle annonce</h1>
      <form>
        <p>Je veux créer un :</p>

        <div>
            <input type="checkbox" id="dream" name="dream" value="Rêve" />
        </div>
      
        <div>
            <input type="checkbox" id="profile" name="profile" value="Profil" />
        </div>
      
        {/* TODO : système de vues en fonction de la case cochée */}
        <input value="Titre" />"
        <textarea value="Description" />

        <input value="Nom" />"
        <textarea value="Description" />
        
        <input type="submit" value="décollage" />
      </form>
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
export default NewAdForm;