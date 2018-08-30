import * as actionType from './ActionType';

export const actionConnected = (connected) => ({
  type: actionType.CONNECTION,
  payload: connected
});

