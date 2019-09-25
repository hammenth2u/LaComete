/**
 * NPM import
 */
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

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
  <AppContainer />
</Provider>;

const renderingArea = document.querySelector('#root');
render(reactRootElement, renderingArea);

// Exemple d'action interceptée par un middleware.
cometStore.dispatch(sideEffect());
