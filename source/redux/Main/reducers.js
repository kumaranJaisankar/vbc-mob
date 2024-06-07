import {combineReducers} from 'redux';
import types from './types';

let dataState = {
  user: {},
  isAuthenticated: false,
  plan: {},
  currentTheme: true,
};

const main = (state = dataState, action) => {
  switch (action.type) {
    case types.USER:
      return Object.assign({}, state, {user: action.payload.user});
    case types.PLAN:
      return Object.assign({}, state, {plan: action.payload.plan});
    case types.IS_AUTHENTICATED:
      return Object.assign({}, state, {
        isAuthenticated: action.payload.info,
      });
    case types.IS_DARK:
      return Object.assign({}, state, {
        currentTheme: action.payload.theme,
      });
    default:
      return state;
  }
};

const reducers = combineReducers({
  main,
});

export default reducers;
