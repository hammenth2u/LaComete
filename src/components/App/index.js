/**
 * IMPORTS
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

/**
 * IMPORTS DE COMPONENTS
 */
import Header from 'src/components/Templates/Header';
import HomeContainer from 'src/components/HomePage/HomeApp';
import About from 'src/components/GeneralPages/About';
import Contact from 'src/components/GeneralPages/Contact';
import Legal from 'src/components/GeneralPages/Legal';
import TermsOfUse from 'src/components/GeneralPages/TermsOfUse';
import Forgotten from 'src/components/GeneralPages/ForgottenPassword';
import AccountContainer from 'src/components/Account/AccountApp/';
import ResultContainer from 'src/components/Results/ResultApp';
import Ad from 'src/components/Ads/Ad';
import EditAd from 'src/components/Ads/EditAd';
import Footer from 'src/components/Templates/Footer';
import ErrorPage from 'src/components/Templates/ErrorPage';

/**
 * STYLES
 */
import '../../styles/index.sass';
import './styles.css'

class App extends React.Component {
  
  state = {
    userStatus: {},
    userStatusError: false,
    userMail: '',
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
    getUserInfo = () => {axios.get('/api/user/account', {cancelToken: this.source.token})   
        
    .then(response => {
          const userdata = response.data[0];
          const usermail = userdata.email;                
          this.setState({ userMail: usermail });
        });
    };

    // EXECUTE API CALL ON PAGE LOAD
    componentDidMount(){
      this.getUserStatus();
      this.getUserInfo();     
    }

    // CANCEL API CALLS 
    componentWillUnmount() {
      this.source.cancel("...");
    }
 
  render () {     
         
    return (
      
      <div id="wrapper">
        <Header userStatus={ this.state.userStatus } />

          <Switch>
            <Route exact path="/" render={(routeProps) => ( <HomeContainer {...routeProps} userStatus={this.state.userStatus} />)}/>
            <Route exact path="/a-propos" component={ About } />
            <Route exact path="/mentions-legales" component={ Legal } />
            <Route exact path="/cdu" component={ TermsOfUse } />
            <Route exact path="/contact" render={(routeProps) => ( <Contact {...routeProps} userStatus={this.state.userStatus} userMail={this.state.userMail} />)}/>
            <Route exact path="/motdepasseoublie" component={ Forgotten }/>
            <Route path="/mon-compte" component={ AccountContainer }  />
            <Route exact path="/recherche/liste/" component={ ResultContainer } />             
            <Route exact path="/annonces/:id" component={ Ad } />       
            <Route exact path="/annonces/:id/editer" component={ EditAd } />
            <Route component={ ErrorPage } />
          </Switch>
        
        <Footer />
      </div>
    )
  }
};

/**
 * EXPORT
 */
export default App;