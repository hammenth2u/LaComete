/**
 * NPM import
 */
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Local import
 */
import App from 'src/components/App';

/**
 * Code
 */

const rootComponent = <BrowserRouter><App /></BrowserRouter>;
const renderingArea = document.querySelector('#root');
render(rootComponent, renderingArea);