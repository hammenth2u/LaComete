import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

//import './styles.sass';

const Settings = ({ userInfo }) => {

  const info = userInfo.map(info =>
    <div key={ info.id }>
        <h1>Bienvenue { info.username }</h1>
        <p>E-mail : { info.email }</p>
        <p>Nom : { info.lastname }</p>
        <p>Prénom : { info.firstname }</p>
    </div>
    )
  return (   
    
    <div className="accMenu">
        
      { info }

      <button>Envoyer</button>
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