import React from 'react';

//import './styles.sass';

const Footer = () => {
  const now = new Date();
  const year = now.getFullYear();

  return <footer className="blog-footer">
    <ul>
        <li><a href="#">Contact</a></li>
        <li><a href="#">A Propos</a></li>
        <li><a href="#">Conditions Générales d'Utilisation</a></li>
        <li><a href="#">Mention Légales</a></li>        
    </ul>
    <br />
    <p>La Comète - O'Clock © {year}</p>
  </footer>;
};

export default Footer;