/**
 * Import
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Local import
 */
//import ResultList from '../../Results/ResultList';
import HomeSearch from '../HomeSearch'
import Intro from 'src/components/HomePage/Intro';

// Styles et assets
import './styles.css';

const HomeApp = () => (
  
  <div id="homepage">

    <section className="homesearch">
      <HomeSearch />      
    </section>    

    <Intro />
    
  </div>
);


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
    }
);

// Étape 2 : on applique ces stratégies à un composant spécifique.
const HomeContainer = connectionStrategies(HomeApp);

// Étape 3 : on exporte le composant connecté qui a été généré
export default HomeContainer;
