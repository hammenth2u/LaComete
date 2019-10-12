/**
 * Import
 */
import React from 'react';
import { connect } from 'react-redux';

// Composants enfants éventuels
import ResultList from 'src/components/SearchPages/Results/ResultList';
import ResultMap from 'src/components/SearchPages/Results/ResultMap';

// Styles et assets
//import './app.sass';

const ResultApp = () => (
  <div id="app">    
    {/* TODO : système de vue map ou liste */}
    <ResultList />
    {/*<ResultMap />*/}
  </div>
);

ResultApp.propTypes = {
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
      title: ownProps.title,
      greeting: state.greetingMessage
    };
  },

  // 2d argument : stratégie d'écriture (dans le state privé global)
  (dispatch, ownProps) => {
    return {
      handleChange: (event) => {
        dispatch(updateInputValue(event.target.value));
      }
    };
  },
);

// Étape 2 : on applique ces stratégies à un composant spécifique.
const ResultContainer = connectionStrategies(ResultApp);

// Étape 3 : on exporte le composant connecté qui a été généré
export default ResultContainer;
