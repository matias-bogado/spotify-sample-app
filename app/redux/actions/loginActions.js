import axios from 'axios';
import { READ_STATE_FROM_STORAGE } from '../middlewares/readStateFromStorage';
import { SAVE_STATE_INTO_STORAGE } from '../middlewares/saveStateIntoStorage';

import credentials from '../../../credentials/spotify';

// Action types
export const LOGIN_CLEAR = 'LOGIN_CLEAR';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_SAVE_INTO_LOCAL_STORAGE = 'LOGIN_SAVE_INTO_LOCAL_STORAGE';
export const LOGIN_READ_FROM_LOCAL_STORAGE = 'LOGIN_READ_FROM_LOCAL_STORAGE';
export const LOGIN_LOAD_STATE_FROM_LOCAL_STORAGE = 'LOGIN_READ_FROM_LOCAL_STORAGE';

// Async action creators
export const loginRequest = payload => {
  return dispatch => {
    const { code } = payload

    dispatch(loginLoading(payload));

    axios({
      responseType: 'json',
      method: 'POST',
      url: 'http://localhost:5000/token-request',
      data: {
        code,
        redirect_uri: credentials.redirect_uri,
        grant_type: 'authorization_code'
      },
      timeout: 30000
    })
      .then(response => {
        const { data } = response;
        if (data) {
          if (data.error) {
            dispatch(loginFailure(data));
          } else {
            dispatch(loginSuccess(data));
          }
        } else {
          dispatch(loginFailure({ error: 'missing_data', error_description: 'missing_data' }));
        }
        dispatch(loginSaveIntoLocalStorage());
      })
      .catch(error => {
        dispatch(loginFailure({ error: 'request_failure', error_description: error.message }));
        dispatch(loginSaveIntoLocalStorage());
      });
  }
};

// Sync action creators
export const loginClear = () => {
  return {
    type: LOGIN_CLEAR
  };
};
export const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    error
  };
};
export const loginLoading = payload => {
  return {
    type: LOGIN_LOADING,
    payload
  };
};
export const loginSuccess = data => {
  return {
    type: LOGIN_SUCCESS,
    data
  };
};

export const loginSaveIntoLocalStorage = () => {
  return {
    type: LOGIN_SAVE_INTO_LOCAL_STORAGE,
    [SAVE_STATE_INTO_STORAGE]: {
      stateKey: 'login',
      storageKey: 'login'
    }
  };
};

export const loginReadFromLocalStorage = () => {
  return {
    type: LOGIN_READ_FROM_LOCAL_STORAGE,
    [READ_STATE_FROM_STORAGE]: {
      actionLoad: loginLoadStateFromLocalStorage,
      storageKey: 'login'
    }
  };
};

export const loginLoadStateFromLocalStorage = storedState => {
  return {
    type: LOGIN_LOAD_STATE_FROM_LOCAL_STORAGE,
    storedState
  };
};
