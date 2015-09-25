import * as action from '../actiontype/grocery.js';

export function addGrocery(item) {
  console.log("Legger til varer!");
  return {
    type: action.ADD_GROCERY,
    item: item
  };
}

export function removeGrocery(itemnum) {
  return {
    type: action.REMOVE_GROCERY,
    itemnum: itemnum  
  };
}
