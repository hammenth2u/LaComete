/**
 * IMPORTS
 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

/**
 * STYLES
 */
import './styles.css';

const ErrorPage = () => {

  return (
    <main className="page404">        
      <h1 className="title404">404</h1>
      <p className="text404">Vous voilà dans une nuit sans rêve, un trou noir dans notre galaxie</p>
      <p className="text404">Retrouvez le chemin vers la comète grâce au portail intergalactique juste en dessous</p>
      <a className="linkerror" href="/"><FontAwesomeIcon icon={faDoorOpen} className="dooricon" /></a>        
    </main>
  )
}

/**
 * EXPORT
 */
export default ErrorPage;