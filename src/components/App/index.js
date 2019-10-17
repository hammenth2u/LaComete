/**
 * Import
 */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';


/**
 * Local import
 */

// Composants enfants éventuels
import Header from 'src/components/Templates/Header';
import HomeContainer from 'src/components/HomePage/HomeApp';
import About from 'src/components/GeneralPages/About';
import Contact from 'src/components/GeneralPages/Contact';
import Legal from 'src/components/GeneralPages/Legal';
import TermsOfUse from 'src/components/GeneralPages/TermsOfUse';
import Forgotten from 'src/components/GeneralPages/ForgottenPassword';
import AccountContainer from 'src/components/Account/AccountApp/';
import ResultContainer from 'src/components/Results/ResultApp';
import Ad from 'src/components/Ad';
import Footer from 'src/components/Templates/Footer';

// Styles et assets
import '../../styles/index.sass';
import './styles.css'

class App extends React.Component {
  
  state = {
    userStatus: {},
    userMail: '',
  }
  
  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  abortController = new AbortController();


    //getUserStatus = () => {axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/user/isConnected'), {cancelToken: this.source.token}    
    getUserStatus = () => {axios.get('http://127.0.0.1:8001/api/user/isConnected', {cancelToken: this.source.token}) 
      .then(response => {
        
        this.setState({ userStatus: response.data[0] });
      })      
      .catch(error => {
      }); 
    };
      
    //getUserInfo = () => {axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/user/account', {cancelToken: this.source.token})     
    getUserInfo = () => {axios.get('http://127.0.0.1:8001/api/user/account/api/user/account', {cancelToken: this.source.token})   
        
    .then(response => {
          const userdata = response.data[0];
          const usermail = userdata.email;                
          this.setState({ userMail: usermail });
        })
        
        .catch(error => {

        });
    };

    componentDidMount(){
      this.getUserStatus();
      this.getUserInfo();     
    }

    componentWillUnmount() {
      this.source.cancel("Operation canceled by the user.");
    }
 
  render () {       
    return (
      
      <div id="app">
        <div id="wrapper">
        <Header userStatus={ this.state.userStatus } />

          <Switch>
            <Route exact path="/" component={ HomeContainer } />
            <Route exact path="/a-propos" component={ About } />
            <Route exact path="/mentions-legales" component={ Legal } />
            <Route exact path="/cdu" component={ TermsOfUse } />
            <Route exact path="/contact" render={(routeProps) => ( <Contact {...routeProps} userStatus={this.state.userStatus} userMail={this.state.userMail} />)}/>
            <Route exact path="/motdepasseoublie" render={(routeProps) => ( <Forgotten {...routeProps} userMail={this.state.userMail} />)}/>
            <Route path="/mon-compte" component={ AccountContainer }  />
            <Route path="/recherche/liste/" component={ ResultContainer } />             
            <Route path="/annonces/:id" component={ Ad } />       
        
          </Switch>
        </div>
        <Footer />

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
      handleChange: (event) => {
        dispatch(updateInputValue(event.target.value));
      },
    };
  },
);

// Étape 2 : on applique ces stratégies à un composant spécifique.
const AppContainer = connectionStrategies(App);

// Étape 3 : on exporte le composant connecté qui a été généré
export default AppContainer;
