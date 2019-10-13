import React from 'react';

import './footer.css';

const Footer = () => {
  const now = new Date();
  const year = now.getFullYear();

  return <div className="website-footer">
    <ul>
        <li><a href="/contact">Contact</a></li> <li><a href="/a-propos">A Propos</a></li>        
        <li><a href="/cdu">Conditions Générales d'Utilisation</a></li>
        <li><a href="/mentions-legales">Mentions Légales</a></li>        
    </ul>
    <p className="copyright">La Comète - O'Clock © {year}</p>
  </div>;
};

export default Footer;