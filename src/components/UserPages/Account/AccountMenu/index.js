import React from 'react';
import PropTypes from 'prop-types';

//import { NavLink } from 'react-router-dom';


// import de données
//import UserData from 'src/data/users.js';

//import './styles.sass';

//class AccMenu extends React.Component {
const AccMenu = ({ userInfo }) => {
        
    const info = userInfo.map(info =>
        <div key={info.id}>
            <h1>Bienvenue { info.username }</h1>
            <p>E-mail : { info.email }</p>
            <p>Nom : { info.lastname }</p>
            <p>Prénom : { info.firstname }</p>
        </div>
        )
    return (   
        
            <div className="accMenu">
            
                { info }

            <button>x Modifier mes informations</button>
            <button>x Retour à la réalité</button>
        </div>
        )
}

/*
AccMenu.propTypes = {
  
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  
}; */


export default AccMenu;