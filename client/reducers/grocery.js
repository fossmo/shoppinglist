
import { ADD_GROCERY, REMOVE_GROCERY } from '../actiontype/grocery.js';

export default function grocery(state = [], action) {
  switch (action.type) {
  case ADD_GROCERY:
    if (action.item && action.item.length > 0) {
      state.push(action.item);
    }
    return state;
  case REMOVE_GROCERY:
    if (action.itemnum > -1) {
      state.splice(action.itemnum, 1);
    }
    return state;
  default:
    return state;
  }
}
