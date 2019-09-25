/**
 * Import
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Local import
 */
import { updateInputValue } from 'src/store/reducer';

// Composants enfants éventuels
import SearchBars from 'src/components/GeneralPages/HomePage/SearchBars';
import Intro from 'src/components/GeneralPages/HomePage/Intro';
import Carousel from 'src/components/GeneralPages/HomePage/Carousel';

// Styles et assets
//import './app.sass';

const HomeApp = () => (
  <div id="app">    
    <SearchBars />
    <Intro />
    <Carousel />
  </div>
);

HomeApp.propTypes = {
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
const HomeContainer = connectionStrategies(HomeApp);

// Étape 3 : on exporte le composant connecté qui a été généré
export default HomeContainer;
