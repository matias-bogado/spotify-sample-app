import { fromJS, Map } from 'immutable';
import {
  REMOVE_PLAYLIST_CLEAR,
  REMOVE_PLAYLIST_FAILURE,
  REMOVE_PLAYLIST_LOADING,
  REMOVE_PLAYLIST_SUCCESS
} from '../actions/removePlaylistActions';

const initialState = Map({
  isLoading: false,
  payload: null,
  error: null,
  data: null
});

export const removePlaylist = (state = initialState, action = {}) => {
  const reducerState = fromJS(state);

  switch (action.type) {
    case REMOVE_PLAYLIST_CLEAR:
      return initialState;

    case REMOVE_PLAYLIST_FAILURE:
      return reducerState.merge(fromJS({
        isLoading: false,
        payload: null, // we remove the payload information for security purposes
        error: action.error,
        data: null
      }));

    case REMOVE_PLAYLIST_LOADING:
      return reducerState.merge(fromJS({
        isLoading: true,
        payload: action.payload,
        error: null,
        data: null
      }));

    case REMOVE_PLAYLIST_SUCCESS:
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
  removePlaylist
};
