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
import About from 'src/components/GeneralPages/About';
import Contact from 'src/components/GeneralPages/Contact';
import Legal from 'src/components/GeneralPages/Legal';
import TermsOfUse from 'src/components/GeneralPages/TermsOfUse';



//import './styles.sass';

const GeneralApp = () => (

    <div className="generalpages">
        <About />
        <Contact />
        <Legal />
        <TermsOfUse/>
    </div>
);

GeneralApp.propTypes = {
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
const GeneralContainer = connectionStrategies(GeneralApp);

// Étape 3 : on exporte le composant connecté qui a été généré
export default GeneralContainer;
