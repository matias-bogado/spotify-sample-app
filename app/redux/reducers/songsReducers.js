import { fromJS, Map } from 'immutable';
import {
  SEARCH_SONGS_CLEAR,
  SEARCH_SONGS_FAILURE,
  SEARCH_SONGS_LOADING,
  SEARCH_SONGS_SUCCESS
} from '../actions/songActions';

const initialState = Map({
  isLoading: false,
  payload: null,
  error: null,
  data: null
});

export const searchSongs = (state = initialState, action = {}) => {
  const reducerState = fromJS(state);

  switch (action.type) {
    case SEARCH_SONGS_CLEAR:
      return initialState;

    case SEARCH_SONGS_FAILURE:
      return reducerState.merge(fromJS({
        isLoading: false,
        payload: null, // we remove the payload information for security purposes
        error: action.error,
        data: null
      }));

    case SEARCH_SONGS_LOADING:
      return reducerState.merge(fromJS({
        isLoading: true,
        payload: action.payload,
        error: null,
        data: null
      }));

    case SEARCH_SONGS_SUCCESS:
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
  searchSongs
};
