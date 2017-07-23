import { fromJS, Map } from 'immutable';
import {
  CREATE_PLAYLIST_CLEAR,
  CREATE_PLAYLIST_FAILURE,
  CREATE_PLAYLIST_LOADING,
  CREATE_PLAYLIST_SUCCESS
} from '../actions/createPlaylistActions';

const initialState = Map({
  isLoading: false,
  payload: null,
  error: null,
  data: null
});

export const createPlaylist = (state = initialState, action = {}) => {
  const reducerState = fromJS(state);

  switch (action.type) {
    case CREATE_PLAYLIST_CLEAR:
      return initialState;

    case CREATE_PLAYLIST_FAILURE:
      return reducerState.merge(fromJS({
        isLoading: false,
        payload: null, // we remove the payload information for security purposes
        error: action.error,
        data: null
      }));

    case CREATE_PLAYLIST_LOADING:
      return reducerState.merge(fromJS({
        isLoading: true,
        payload: action.payload,
        error: null,
        data: null
      }));

    case CREATE_PLAYLIST_SUCCESS:
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
  createPlaylist
};
