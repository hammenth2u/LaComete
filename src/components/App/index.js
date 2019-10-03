/**
 * Import
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

/**
 * Local import
 */
//import { updateInputValue } from 'src/store/reducer';

// Composants enfants éventuels
import Header from 'src/components/Templates/Header';
import HomeContainer from 'src/components/HomePage/HomeApp';
import About from 'src/components/GeneralPages/About';
import Contact from 'src/components/GeneralPages/Contact';
import Legal from 'src/components/GeneralPages/Legal';
import TermsOfUse from 'src/components/GeneralPages/TermsOfUse';
import AccountContainer from 'src/components/UserPages/Account/AccountApp/';
import AdContainer from 'src/components/AdPages/AdApp';
import ResultContainer from 'src/components/SearchPages/Results/ResultApp';
import Footer from 'src/components/Templates/Footer';

// Styles et assets
import './app.sass';

class App extends React.Component {

  state = {
    userStatus: {}
  }

  componentDidMount(){
    
    axios.get('http://127.0.0.1:8001/api/user/isConnected')
      //axios.get('http://ec2-3-84-230-242.compute-1.amazonaws.com/api/user/account')
        
        .then(response => {

          this.setState({ userStatus: response.data[0] });
          console.log('TEST CONNECTED : ', response.data[0]);
          console.log('STATE : ', this.state);
        })

        .catch(error => {

          console.log('ERROR : ', error);
        }); 
        
      }

  render () {
    return (
      <div id="app">
        
        <Header userStatus={ this.state.userStatus } />

          <Switch>
            <Route exact path="/" component={ HomeContainer } />
            <Route exact path="/a-propos" component={ About } />
            <Route exact path="/mentions-legales" component={ Legal } />
            <Route exact path="/cdu" component={ TermsOfUse } />
            <Route exact path="/contact" render={(routeProps) => ( <Contact {...routeProps} userStatus={ this.state.userStatus } />)} />
            <Route path="/mon-compte" component={ AccountContainer }  />
            <Route path="/annonces" component={ AdContainer } />
            <Route path="/recherche" component={ ResultContainer } />
                  
          </Switch>
        <Footer />
      </div>
    )
  }
};

App.propTypes = {

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
