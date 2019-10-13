import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'

//class AccMenu extends React.Component {
const AccMenu = ({ userInfo, handleClick }) => {
        
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

            <a className="btn" href="/deconnexion">x Retour à la réalité</a>  
            <button onClick={handleClick} value="x Désactiver mon compte" />            
            <small>Votre profil, vos annonces et vos commentaires ne seront plus visibles sur le site</small>         
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