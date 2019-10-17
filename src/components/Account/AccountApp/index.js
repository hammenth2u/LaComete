/**
 * IMPORTS 
 */
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Route, Switch, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * IMPORTS DE COMPONENTS
 */
import AccMenu from '../AccountMenu'
import AdsList from '../AdsList';
import Favorites from '../Favorites';
import Settings from '../Settings';
import SubmitForm from '../NewAdForm';

import './style.css';

class AccountApp extends React.Component {

    state = {

        userStatus: {},
        currentUser: [],
        userAds: [],
        userFav: [] 
    }

    
    componentDidMount(){
    axios.get('/api/user/isConnected')
    //axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/user/isConnected')
    
        .then(response => {

            this.setState({ userStatus: response.data[0] });
            console.log('STATE ACC: ', this.state.userStatus);
        })

        .catch(error => {

            console.log('STATUS ERROR : ', error);
        }); 

    axios.get('/api/user/account')
    //axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/user/account')
    
        .then(response => {

            this.setState({ currentUser: response.data });
            console.log('STATE USER INFO: ', this.state.currentUser);
        })
        
        .catch(error => {

            console.log('DATA ERROR : ', error);
        }); 

    axios.get('/api/list/user/annonces/')
    //axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/user/annonces/')
    
        .then(response => {

            this.setState({ userAds: response.data });
            console.log('STATE USER ADS: ', this.state.userAds);
        })

        .catch(error => {
    
            console.log('ADS ERROR : ', error);
        });
        
    axios.get('/api/list/favorites')
    //axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/list/favorites')
    
        .then(response => {

            this.setState({ userFav: response.data });
            console.log('STATE USER FAV: ', this.state.userFav);
        })
        .catch(error => {
    
            console.log('FAV ERROR : ', error);
        });
    }

    deleteAccount = (evt) => {
        
        axios.get('/api/block/account')
        //axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/user/delete')

        .then(response => {
            this.props.history.push('/');            
        })
        .catch(error => {    
            console.log('DELETE ERROR : ', error);
        });
    }
      
    render () {

        const greeting = this.state.currentUser.map(info =>
            <p className="active" key={ info.id }>Bienvenue { info.username }</p>                
        )

        return (
            <div className="account-base">
            {this.state.userStatus == "<" ? (
                <div>
                    <h1>Vous n'avez pas encore rejoint le pays des rêves</h1>
                    <h2>Veuillez prendre place sur la comète en suivant l'un des liens ci-dessous</h2>
                
                    <div>
                    <a href="/connexion">Connexion</a>          
                    <a href="/inscription">Inscription</a>                        
                    </div>
                </div>
                ) : (                                
                  <div className="accountpages">
             
                    <aside className="sidebar">
                        { greeting }
                        <a href="/mon-compte/mes-annonces">Mes Annonces</a>
                        <a href="/mon-compte/mes-favoris">Mes Favoris</a>
                        <a href="/mon-compte/nouvelle-annonce">Créer une annonce</a>
                        <a href="/mon-compte/parametres">Paramètres</a>
                        <button type="submit" className="deactivatebtn" onClick={this.deleteAccount}><FontAwesomeIcon icon={ faTimes } /> Désactiver mon compte</button>                                        
                    </aside>

                    <section className="account-container">
                        <Switch>
                            <Route exact path="/mon-compte" component={AccMenu} />
                            <Route exact path="/mon-compte/parametres" render={(routeProps) => ( <Settings {...routeProps} userInfo={ this.state.currentUser } />)} />
                            <Route exact path="/mon-compte/mes-annonces" render={(routeProps) => ( <AdsList {...routeProps} userAds={ this.state.userAds } />)}/>
                            <Route exact path="/mon-compte/mes-favoris" render={(routeProps) => ( <Favorites {...routeProps} userFavs={ this.state.userFav } />)}/>
                            <Route exact path="/mon-compte/nouvelle-annonce" component={ SubmitForm }/>   
                        </Switch>
                    </section>
                </div>
                )
            } 
            </div>             
        )
    }
    
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
export default withRouter(AccountContainer);
