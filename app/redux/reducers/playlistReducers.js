import { fromJS, Map } from 'immutable';
import { CREATE_PLAYLIST_SUCCESS } from '../actions/createPlaylistActions';

const initialState = Map({});

export const playlist = (state = initialState, action = {}) => {
  const reducerState = fromJS(state);

  switch (action.type) {
    // case PLAYLIST_CLEAR:
    //   return initialState;

    case CREATE_PLAYLIST_SUCCESS:
      const { data } = action;
      return reducerState.merge(fromJS({
        [data.id]: data
      }));

    // case REMOVE_PLAYLIST_SUCCESS:
    //   return reducerState.merge(fromJS({
    //     isLoading: true,
    //     payload: action.payload,
    //     error: null,
    //     data: null
    //   }));

    default:
      return reducerState
  }
};

export default {
  playlist
};
