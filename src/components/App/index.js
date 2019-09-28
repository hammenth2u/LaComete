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
import Header from 'src/components/Templates/Header';
import HomeContainer from 'src/components/GeneralPages/HomePage/HomeApp';
import About from 'src/components/GeneralPages/About';
import Contact from 'src/components/GeneralPages/Contact';
import Legal from 'src/components/GeneralPages/Legal';
import TermsOfUse from 'src/components/GeneralPages/TermsOfUse';
import Account from 'src/components/UserPages/Account';
import Ad from 'src/components/SearchPages/Ad';
import AdsList from 'src/components/UserPages/Account/AdsList';
import Connection from 'src/components/UserPages/Connection';
import Inscription from 'src/components/UserPages/Inscription';
import Favorites from 'src/components/UserPages/Account/Favorites';
import NewAdForm from 'src/components/UserPages/Account/NewAdForm';
import Settings from 'src/components/UserPages/Account/Settings';
import ResultContainer from 'src/components/SearchPages/Results/ResultApp';
import Footer from 'src/components/Templates/Footer';

// Styles et assets
import './app.sass';

const App = () => (
  <div id="app">
    

    <HomeContainer />
    {/*}
    <About />
    <Contact />
    <Legal />
    <TermsOfUse/>

    <Account />
    <Ad />
    <AdsList />
    <Connection /> 
    <Inscription />
    <Favorites />
    <NewAdForm />
    <Settings />
    
    */}
    <Footer />
  </div>
);

App.propTypes = {
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
const AppContainer = connectionStrategies(App);

// Étape 3 : on exporte le composant connecté qui a été généré
export default AppContainer;
