import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';


// import de données
//import UserData from 'src/data/users.js';

//import './styles.sass';

//class AccMenu extends React.Component {
const AccMenu = ({ username, firstname, lastname, email, birthdate }) => {
    //render () {
    return (   
        
            <div className="accMenu">
            
            <h1>Bienvenue { username }</h1>
            
            <p>E-mail : { email }</p>
            <p>Nom : { lastname }</p>
            <p>Prénom : { firstname }</p>
              <p>Date de naissance : { birthdate }</p>

            <button>x Modifier mes informations</button>
            <button>x Retour à la réalité</button>
        </div>
        )
}


AccMenu.propTypes = {
  
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  
};


export default AccMenu;