/**
 * IMPORTS
 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitterSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const now = new Date();
  const year = now.getFullYear();

  return (
    
    <div className="website-footer">

      <ul className="pages">
          <li><a href="/a-propos">A Propos</a></li>   
          <li><a href="/contact">Contact</a></li>                
          <li><a href="/cdu">Conditions d'Utilisation</a></li>
          <li><a href="/mentions-legales">Mentions Légales</a></li>        
      </ul>
     
      <div className="middle">
        <FontAwesomeIcon icon={faFacebookSquare} className="social"/> - <FontAwesomeIcon icon={faTwitterSquare} className="social"/> - <FontAwesomeIcon icon={faLinkedin} className="social"className="social"/>
        <p className="copyright">La Comète - O'Clock © {year}</p>       
      </div>
     
      <ul className="info">          
        <li>lacomete@oclock.io</li>
        <li>0835656565</li>
        <li>2ème étoile à droite</li>
        <li>tout droit jusqu'au matin</li>  
      </ul>
    
  </div>
  )
};

/**
 * EXPORT
 */
export default Footer;