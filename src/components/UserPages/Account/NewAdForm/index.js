import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const NewAdForm = ({ handleChange, onSubmit }) => {

  return (
    <div className="newadform">
      <h1>Créer une nouvelle annonce</h1>
      <form>
        <p>Je veux créer un :</p>

        <div>
            <label>Rêve</label>
            <input type="radio" id="dream" name="adtype" />
        
            <label>Profil</label>
            <input type="radio" id="profile" name="adtype" />
        </div>
      
        <div>
          <label>Titre : </label>
          <input
          type="text"
          id="title"
          onChange={handleChange}
          />
        </div>      

        <div>
          <label>Description : </label>
          <textarea
          type="text"
          id="description"
          onChange={handleChange}
          />
        </div> 
       
        <div>
          <label>Je recherche : </label>
          <textarea
          type="text"
          id="needs"
          onChange={handleChange}
          />
        </div> 
        
        <input type="submit" value="décollage" onClick={onSubmit} />
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