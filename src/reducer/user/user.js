import {extend} from '../../utils.js';

const SERVER_URL = `https://htmlacademy-react-3.appspot.com/`;

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authErrorMessage: null,
  avatarUrl: ``,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_AVATAR_URL: `SET_AVATAR_URL`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  setAvatarUrl: (avatarUrl) => {
    return {
      type: ActionType.SET_AVATAR_URL,
      payload: avatarUrl
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload
      });
    case ActionType.SET_AVATAR_URL:
      return extend(state, {
        avatarUrl: `${SERVER_URL}${action.payload}`
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setAvatarUrl(response.data.avatar_url));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData, onSuccess, onError) => (dispatch, getState, api) => {
    return api
      .post(`/login`, {
        email: authData.login,
        password: authData.password
      })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setAvatarUrl(response.data.avatar_url));
        onSuccess();
      })
      .catch((error) => {
        if (error.response) {
          onError(error.response.data.error);
        }
      });
  }
};


export {ActionCreator, ActionType, AuthorizationStatus,
  Operation, reducer,
};
