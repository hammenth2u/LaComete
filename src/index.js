/**
 * NPM import
 */
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import history from './components/History';

/**
 * Local import
 */
import AppContainer from 'src/components/App';
import cometStore from 'src/store';
import { sideEffect } from 'src/store/reducer';

/**
 * Code
 */

const reactRootElement = <Provider store={cometStore}>
  <Router history={history} >
    <AppContainer />
  </Router>
</Provider>;

const renderingArea = document.querySelector('#root');
render(reactRootElement, renderingArea);

// Exemple d'action interceptée par un middleware.
cometStore.dispatch(sideEffect());
