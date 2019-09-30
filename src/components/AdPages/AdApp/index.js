/**
 * IMPORTS 
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';

/**
 * IMPORTS DE COMPONENTS
 */
import Ad from '../Ad';
import AdTeaser from '../AdTeaser';

/**
 * IMPORTS DE DATA
 */
import data from 'src/data/users.js';

//import './styles.sass';

const AdApp = () => (

    <div className="adpages">
      
        <Ad ads={data.ads} author={data.username} />
        {console.log('TEST AD : ', data.ads)}
        <AdTeaser title={data.ads.title} />
      
    </div>
);

AdApp.propTypes = {
    /** Titre de l'application React */
  };
  
  /**
   * Export
   */
  
// Étape 1 : on définit des stratégies de connexion au store de l'app.
const connectionStrategies = connect(
    // 1er argument : stratégie de lecture (dans le state privé global)
    (state, ownProps) => {
        return {
        };
    },

    // 2d argument : stratégie d'écriture (dans le state privé global)
    (dispatch, ownProps) => {
        return {
        }
    },
);

// Étape 2 : on applique ces stratégies à un composant spécifique.
const AdContainer = connectionStrategies(AdApp);

// Étape 3 : on exporte le composant connecté qui a été généré
export default AdContainer;
