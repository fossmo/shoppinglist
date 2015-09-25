require('./styles/style.less');

import React from 'react';
import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import configureStore from './store/store.js';
import Grocery from './components/Grocery.js';
import * as GroceryActions from './actions/grocery.js';

const store = configureStore();

function mapStateToProps(state) {
  return {
    grocery: state.grocery
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GroceryActions, dispatch);
}

let App = connect(mapStateToProps, mapDispatchToProps)(Grocery);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('app')
);
