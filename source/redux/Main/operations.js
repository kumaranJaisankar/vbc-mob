import actions from './actions';

const setUser = user => {
  return dispatch => {
    return dispatch(actions.setUser(user));
  };
};

const setPlan = plan => {
  return dispatch => {
    return dispatch(actions.setPlan(plan));
  };
};

const updateTheme = theme => {
  return dispatch => {
    return dispatch(actions.updateTheme(theme));
  };
};

const updateAuthentication = info => {
  return dispatch => {
    return dispatch(actions.updateAuthentication(info));
  };
};
export default {
  setUser,
  updateAuthentication,
  setPlan,
  updateTheme,
};
