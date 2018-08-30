import * as actionType from '../actions/ActionType';

const loginReducer = (state = false, action) => {
  switch (action.type) {
    case actionType.CONNECTION:
      return action.payload;
    default:
      return state
  }
}

export default loginReducer;
