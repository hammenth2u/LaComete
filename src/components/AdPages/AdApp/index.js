/**
 * IMPORTS 
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
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

class AdApp extends React.Component {

    state = { 
        data: [],
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8001/api/annonces/list')
          
      .then(response => {

            const adlist = response.data;
            this.setState({ data: response.data });
        });         
    }
    render () {
        
        return (
        <div className="adpages">
            <Ad adlist={this.state.data}/>           
            <AdTeaser adlist={this.state.data} />
        
        </div>
        )
    }
};

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
