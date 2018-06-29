
import React from 'react';
import { render } from 'react-dom';

import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import cablecar from 'redux-cablecar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import App from './components/app';

const cheapLogger = store => next => (incomingAction) => {
  console.log('REDUX ACTION:', incomingAction);
  next(incomingAction);
}

// Create Redux Store (attach cablecar)
var store = createStore(reducers, applyMiddleware(cablecar, cheapLogger));

// Attach App to Rails
window.ignite = function() {

  // Connect cablecar to the store
  cablecar.connect(store, 'MainChannel', {
    connected: function() { store.dispatch({ type: "GET_RECENT_MSGS" }); } // connected callback
  });

  window.ReactStore = store;

  render(
    <MuiThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('reactApp')
  );
};
