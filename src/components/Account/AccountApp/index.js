/**
 * IMPORTS 
 */
import React from 'react';
import axios from 'axios';
import { Route, Switch, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * IMPORTS DE COMPONENTS
 */
import AdsList from '../AdsList';
import Favorites from '../Favorites';
import Settings from '../Settings';
import SubmitForm from '../NewAdForm';
import ErrorPage from 'src/components/Templates/ErrorPage';

/**
 * STYLES
 */
import './style.css';

class AccountApp extends React.Component {

    state = {
        currentUser: [],
        userAds: [],
        userFav: [] 
    }

    // HELPS CANCELLING API CALLS WHEN UNNECESSARY
    CancelToken = axios.CancelToken; 
    source = this.CancelToken.source();
    abortController = new AbortController();

    // IS USER LOGGED IN?
    getUserStatus = () => {axios.get('/api/user/isConnected', {cancelToken: this.source.token}) 
      .then(response => {
        
        this.setState({ userStatus: response.data[0] });
        console.log('APP STATUS : ', this.state.userStatus)
      })      
      .catch(error => {
      }); 
    };    

      // GET USER INFO
      getUserInfo = () => {axios.get('/api/user/account')
    
        .then(response => {

            this.setState({ currentUser: response.data });
        })        
        .catch(error => {
            console.log('DATA ERROR : ', error);
        });
      }; 

      // GET CURRENT USER'S ADS
      getUserAds = () => {axios.get('/api/list/user/annonces/')    
    
        .then(response => {

            this.setState({ userAds: response.data });
        })
        .catch(error => {    
            console.log('ADS ERROR : ', error);
        });
      };
        
      // GET CURRENT USER'S FAVORITES
      getUserFavs = () => {axios.get('/api/list/favorites')    
    
        .then(response => {

            this.setState({ userFav: response.data });
        })
        .catch(error => {    
            console.log('FAV ERROR : ', error);
        });
      };
    
    componentDidMount(){
        this.getUserStatus();
        this.getUserInfo();
        this.getUserAds();
        this.getUserFavs();
    }

    // DEACTIVATE USER
    deleteAccount = (evt) => {
        
        axios.get('/api/block/account')

        .then(response => {
            this.props.history.push('/');       
            
        })
        .catch(error => {    
            console.log('DELETE ERROR : ', error);
        });
    }
      
    render () {

        // DISPLAY USERNAME ON TOP OF SIDEBAR
        const greeting = this.state.currentUser.map(info =>
            <p className="active" key={ info.id }>Bienvenue { info.username }</p>                
        )

        return (
            <div className="account-base">                                           
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
                            <Route exact path="/mon-compte" component={ ErrorPage } />
                            <Route exact path="/mon-compte/parametres" render={(routeProps) => ( <Settings {...routeProps} userInfo={ this.state.currentUser } />)} />
                            <Route exact path="/mon-compte/mes-annonces" render={(routeProps) => ( <AdsList {...routeProps} userAds={ this.state.userAds } />)}/>
                            <Route exact path="/mon-compte/mes-favoris" render={(routeProps) => ( <Favorites {...routeProps} userFavs={ this.state.userFav } />)}/>
                            <Route exact path="/mon-compte/nouvelle-annonce" component={ SubmitForm }/>   
                        </Switch>
                    </section>
                </div>                
            </div>             
        )
    }
    
};
 
/**
 * EXPORT
 */ 
export default withRouter(AccountApp);
