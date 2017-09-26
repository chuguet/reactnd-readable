import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
//import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

const debug = false;

let middleware = applyMiddleware(thunk);

if(debug) {
	middleware = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(
  reducer,
  middleware
);

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter><App/></BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
