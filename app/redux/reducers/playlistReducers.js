import { fromJS, Map } from 'immutable';
import { PLAYLIST_CLEAR, PLAYLIST_ADD_SONG, PLAYLIST_LOAD_STATE_FROM_LOCAL_STORAGE } from '../actions/playlistActions';
import { CREATE_PLAYLIST_SUCCESS } from '../actions/createPlaylistActions';
import { REMOVE_PLAYLIST_SUCCESS } from '../actions/removePlaylistActions';

const initialState = Map({});

export const playlist = (state = initialState, action = {}) => {
  const reducerState = fromJS(state);

  switch (action.type) {
    case PLAYLIST_CLEAR:
      return initialState;

    case CREATE_PLAYLIST_SUCCESS:
      const { data } = action;
      return reducerState.merge(fromJS({
        [data.id]: data
      }));

    case PLAYLIST_LOAD_STATE_FROM_LOCAL_STORAGE:
      return reducerState.merge(fromJS(action.storedState));

    case PLAYLIST_ADD_SONG:
      const { playlistId, song } = action;
      const songs = reducerState.getIn([playlistId, 'songs'], new Map());

      return reducerState.setIn([playlistId, 'songs'], songs.merge(fromJS({
        [song.id]: song
      })));

    case REMOVE_PLAYLIST_SUCCESS:
      return reducerState.withMutations(mutableMap => {
        const { data } = action;
        const playlistIds = data.playlistIds || [];

        playlistIds.forEach(id => {
          mutableMap.delete(id);
        });

        return mutableMap;
      })

    default:
      return reducerState
  }
};

export default {
  playlist
};
