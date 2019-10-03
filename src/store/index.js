import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";

import reducer from 'src/store/reducer';
//import middleware from 'src/store/middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cometStore = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default cometStore;
