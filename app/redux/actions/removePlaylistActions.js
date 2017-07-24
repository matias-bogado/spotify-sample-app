import { playlistSaveIntoLocalStorage } from './playlistActions';

// Action types
export const REMOVE_PLAYLIST_CLEAR = 'REMOVE_PLAYLIST_CLEAR';
export const REMOVE_PLAYLIST_FAILURE = 'REMOVE_PLAYLIST_FAILURE';
export const REMOVE_PLAYLIST_LOADING = 'REMOVE_PLAYLIST_LOADING';
export const REMOVE_PLAYLIST_SUCCESS = 'REMOVE_PLAYLIST_SUCCESS';

// Async action creators
export const removePlaylistRequest = payload => {
  // TODO: Call server
  return dispatch => {
    dispatch(removePlaylistSuccess({ playlistIds: payload.playlistIds }));
    dispatch(playlistSaveIntoLocalStorage());
  }
};

// Sync action creators
export const removePlaylistClear = () => {
  return {
    type: REMOVE_PLAYLIST_CLEAR
  };
};
export const removePlaylistFailure = error => {
  return {
    type: REMOVE_PLAYLIST_FAILURE,
    error
  };
};
export const removePlaylistLoading = payload => {
  return {
    type: REMOVE_PLAYLIST_LOADING,
    payload
  };
};
export const removePlaylistSuccess = data => {
  return {
    type: REMOVE_PLAYLIST_SUCCESS,
    data
  };
};
