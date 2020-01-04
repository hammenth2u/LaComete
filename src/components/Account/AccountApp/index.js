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
      }); 
    };    

      // GET USER INFO
    getUserInfo = () => {axios.get('/api/user/account')

      .then(response => {

        this.setState({ currentUser: response.data });
      });
    }; 

    // GET CURRENT USER'S ADS
    getUserAds = () => {axios.get('/api/list/user/annonces/')    

      .then(response => {

        this.setState({ userAds: response.data });
        console.log('test : ', response.data)
      });
    };
    
    // GET CURRENT USER'S FAVORITES
    getUserFavs = () => {axios.get('/api/list/favorites')    

      .then(response => {

        this.setState({ userFav: response.data });
      });
    };
    
    componentDidMount(){
      this.getUserStatus();
      this.getUserInfo();
      this.getUserAds();
      this.getUserFavs();
    }

    // DEACTIVATE USER
    deleteAccount = () => {        
      axios.get('/api/block/account')

      .then(response => {
        this.props.history.push('/');                   
      });
    }
      
    render () {

        // DISPLAY USERNAME ON TOP OF SIDEBAR
        const greeting = this.state.currentUser.map(info =>
            <p className="active" key={ info.id }>Bienvenue { info.username }</p>                
        )

        return (
        <div className="account-base">                                           
          <aside className="sidebar">            
            { greeting }
            <div className="sidebar-content">
              <a href="/mon-compte/mes-annonces">Mes Annonces</a>
              <a href="/mon-compte/mes-favoris">Mes Favoris</a>
              <a href="/mon-compte/nouvelle-annonce">Créer une annonce</a>
              <a href="/mon-compte/parametres">Paramètres</a>
              <button type="submit" className="deactivatebtn" onClick={this.deleteAccount}><FontAwesomeIcon icon={ faTimes } /> Désactiver mon compte</button>                                        
            </div>
          </aside>

          <main className="account-container">
            <Switch>
              <Route exact path="/mon-compte" component={ ErrorPage } />
              <Route exact path="/mon-compte/parametres" render={(routeProps) => ( <Settings {...routeProps} userInfo={ this.state.currentUser } />)} />
              <Route exact path="/mon-compte/mes-annonces" render={(routeProps) => ( <AdsList {...routeProps} userAds={ this.state.userAds } />)}/>
              <Route exact path="/mon-compte/mes-favoris" render={(routeProps) => ( <Favorites {...routeProps} userFavs={ this.state.userFav } />)}/>
              <Route exact path="/mon-compte/nouvelle-annonce" component={ SubmitForm }/>   
            </Switch>
          </main>
        </div>             
        )
    }    
};
 
/**
 * EXPORT
 */ 
export default withRouter(AccountApp);
