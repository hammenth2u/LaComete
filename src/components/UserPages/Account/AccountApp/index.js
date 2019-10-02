/**
 * IMPORTS 
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
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
//import data from 'src/data/users.js';
//import './styles.sass';

class AccountApp extends React.Component {

    state = {

        connectedUser: [],      
    }

   
      componentDidMount(){
          //axios.get('http://127.0.0.1:8001/api/user/account')
          axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/user/account')
            
        .then(response => {

            const currentUserInfo = response.data
            this.setState({ connectedUser: currentUserInfo });
            console.log('TEST API : ', currentUserInfo);
            console.log('STATE : ', this.state);
          });          
      }
      
    render () {
        return (
            <div className="accountpages">
             
            <aside>
                <a href="/mon-compte">Mon Compte</a>
                <a href="/mon-compte/mes-annonces">Mes Annonces</a>
                <a href="/mon-compte/mes-favoris">Mes Favoris</a>
                <a href="/mon-compte/nouvelle-annonce">Créer une annonce</a>
                <a href="/mon-compte/parametres">Paramètres</a>
            </aside>

            <main>
                
                <Switch>

                    <Route exact path="/mon-compte" render={(routeProps) => ( <AccMenu {...routeProps} userInfo={ this.state.connectedUser } />)}/>
                    <Route exact path="/mon-compte/parametres" component={ Settings } />
                    <Route exact path="/mon-compte/mes-annonces" component={ AdsList } />
                    <Route exact path="/mon-compte/mes-favoris" component={ Favorites } />
                    <Route exact path="/mon-compte/nouvelle-annonce" component={ NewAdForm } />
                    
                </Switch>
            </main>
        </div>
        )
    }
    
    };

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
