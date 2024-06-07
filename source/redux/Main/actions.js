import types from './types';

const setUser = user => ({
  type: types.USER,
  status: 'success',
  payload: {
    user: user,
  },
});

const setPlan = plan => ({
  type: types.PLAN,
  status: 'success',
  payload: {
    plan: plan,
  },
});

const updateAuthentication = info => ({
  type: types.IS_AUTHENTICATED,
  status: 'success',
  payload: {
    info: info,
  },
});

const updateTheme = theme => ({
  type: types.IS_DARK,
  status: 'success',
  payload: {
    theme: theme,
  },
});

export default {
  setUser,
  updateAuthentication,
  setPlan,
  updateTheme,
};
