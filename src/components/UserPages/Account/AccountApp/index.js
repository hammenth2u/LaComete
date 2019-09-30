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

<<<<<<< HEAD
class AccountApp extends React.Component {

    state = {

        username: '',
        firstname: '',
        lastname: '',
        birthdate: '',
        email: '',        
    }

   /*  getUserData = (evt) => {

        evt.preventDefault();
        //console.log('recherche lancée');
        const promise = axios.get('https://api.github.com/search/repositories?per_page=200&q=' + this.state.search );
        promise.then(response => {
          this.setState({ data: response.data.items, nb: response.data.total_count });
        });
      } */

      componentDidMount(){
          axios.post('http://127.0.0.1:8001/api/user/account', {
            username: '', 
            firstname: '', 
            lastname: '', 
            username: '', 
            email: '', 
            birthdate: ''
          })
          .then(response => {
            console.log('TEST API : ', response);
          });          
      }

    render () {
        return (
            <div className="accountpages">
             
            <aside>
                <a>Mes Annonces</a>
                <a>Mes Favoris</a>
                <a>Paramètres</a>
            </aside>

            <main>
                {/*
                <AccMenu username={this.state.username} firstname={this.state.firstname} lastname={this.state.lastname} email={this.state.email} birthdate={this.state.birthday} />

                
                <AdsList />
                <Favorites />
                <Settings />
                <NewAdForm /> */}
            </main>
        </div>
        )
    }
    
    };
=======
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
>>>>>>> dc2cfa0dc749c1a9f65712cae57422c13b3c2ea8

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
