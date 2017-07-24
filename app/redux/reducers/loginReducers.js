import { fromJS, Map } from 'immutable';
import {
  LOGIN_CLEAR,
  LOGIN_FAILURE,
  LOGIN_LOADING,
  LOGIN_SUCCESS
} from '../actions/loginActions';

const initialState = Map({
  isLoading: false,
  payload: null,
  error: null,
  data: null
});

export const login = (state = initialState, action = {}) => {
  const reducerState = fromJS(state);

  switch (action.type) {
    case LOGIN_CLEAR:
      return initialState;

    case LOGIN_FAILURE:
      return reducerState.merge(fromJS({
        isLoading: false,
        payload: null, // we remove the payload information for security purposes
        error: action.error,
        data: null
      }));

    case LOGIN_LOADING:
      return reducerState.merge(fromJS({
        isLoading: true,
        payload: action.payload,
        error: null,
        data: null
      }));

    case LOGIN_SUCCESS:
      return reducerState.merge(fromJS({
        isLoading: false,
        payload: null, // we remove the payload information for security purposes
        error: null,
        data: action.data
      }));

    default:
      return reducerState
  }
};

export default {
  login
};
