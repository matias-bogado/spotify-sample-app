import { playlistSaveIntoLocalStorage } from './playlistActions';

// Action types
export const CREATE_PLAYLIST_CLEAR = 'CREATE_PLAYLIST_CLEAR';
export const CREATE_PLAYLIST_FAILURE = 'CREATE_PLAYLIST_FAILURE';
export const CREATE_PLAYLIST_LOADING = 'CREATE_PLAYLIST_LOADING';
export const CREATE_PLAYLIST_SUCCESS = 'CREATE_PLAYLIST_SUCCESS';

// Async action creators
export const createPlaylistRequest = payload => {
  // TODO: Save into spotify account
  return dispatch => {
    dispatch(createPlaylistSuccess({ name: payload.playlistName, id: Date.now().toString() }));
    dispatch(playlistSaveIntoLocalStorage());
  }
};

// Sync action creators
export const createPlaylistClear = () => {
  return {
    type: CREATE_PLAYLIST_CLEAR
  };
};
export const createPlaylistFailure = error => {
  return {
    type: CREATE_PLAYLIST_FAILURE,
    error
  };
};
export const createPlaylistLoading = payload => {
  return {
    type: CREATE_PLAYLIST_LOADING,
    payload
  };
};
export const createPlaylistSuccess = data => {
  return {
    type: CREATE_PLAYLIST_SUCCESS,
    data
  };
};
