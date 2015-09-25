require('./styles/style.less');

import React, {Component} from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// React component
class Counter extends Component {
  render(){
    const { value, onIncreaseClick, onDecreaseClick, dispatch } = this.props;
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
        <button onClick={this.onLocalDecClick}>Decrease</button>
      </div>
    );
  }

  onLocalDecClick(){
    store.dispatch(decreaseAction);
  }
}

// Action:
const increaseAction = {type: 'increase'};
const decreaseAction = {type: 'decrease'};

// Reducer:
function counter(state={count: 0}, action) {
  let count = state.count;
  switch(action.type){
    case 'increase':
      return {count: count+1};
    case 'decrease':
      return {count: count-1};
    default:
      return state;
  }
}

// Store:
let store = createStore(counter);

// Map Redux state to component props
function mapStateToProps(state)  {
  return {
    value: state.count
  };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction),
    onDecreaseClick: () => dispatch(decreaseAction)
  };
}

// Connected Component:
let App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('app')
);
