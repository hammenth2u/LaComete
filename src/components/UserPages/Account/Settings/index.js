import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const Settings = ({ userInfo, handleChange, onSubmit }) => {

  const info = userInfo.map(info =>
    <div key={ info.id }>
        <div>
          <label>Mon nom d'utilisateur : </label>
          <input
          type="text"
          id="username"
          placeholder={ info.username }
          onChange={handleChange}
          />
        </div>
        <div>
          <label>Mon nom : </label>
          <input
          type="text"
          id="lastname"
          placeholder={ info.lastname }
          onChange={handleChange}
          />
        </div>
          <div>
          <label>Mon prénom : </label>
          <input
          type="text"
          id="firstname"
          placeholder={ info.firstname }
          onChange={handleChange}
          />
        </div>
        <div>
          <label>Mon e-mail : </label>
          <input
          type="text"
          id="email"
          placeholder={ info.email }
          onChange={handleChange}
          />
        </div>        
        <div>
          <label>Nouveau mot de passe : </label>
          <input
          type="text"
          id="password"
          onChange={handleChange}
          />
        </div>
        <div>
          <label>Confirmation du nouveau mot de passe : </label>
          <input
          type="text"
          id="password"
          onChange={handleChange}
          />
        </div>
        <div>
          <label>Mot de passe actuel : </label>
          <input
          type="text"
          id="password"
          onChange={handleChange}
          />
        </div>
    </div>
    )
  return (   
    
    <div className="accMenu">
        
      { info }

      <input type="submit" value="Modifier" onClick={onSubmit} />
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
export default Settings;