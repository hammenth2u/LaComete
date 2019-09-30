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
import AccMenu from '../AccountMenu';
import AdsList from '../AdsList';
import Favorites from '../Favorites';
import Settings from '../Settings';
import NewAdForm from '../NewAdForm';

/**
 * IMPORTS DE DATA
 */
import data from 'src/data/users.js';
import test from 'LaComete-back/src/Controller/Api/TestController.php';

//import './styles.sass';

const AccountApp = () => (

    <div className="accountpages">
      <aside>
        <a>Mes Annonces</a>
        <a>Mes Favoris</a>
        <a>Paramètres</a>
      </aside>

      <main>
      
        <AccMenu test={} username={data.username} firstname={data.firstname} lastname={data.lastname} email={data.email} birthdate={data.birthdate} />

        {/*
        <AdsList />
        <Favorites />
        <Settings />
        <NewAdForm /> */}
      </main>
    </div>
);

AccountApp.propTypes = {
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
const AccountContainer = connectionStrategies(AccountApp);

// Étape 3 : on exporte le composant connecté qui a été généré
export default AccountContainer;
