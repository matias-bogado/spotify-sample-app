import Spotify from 'spotify-web-api-js';

import store from '../store/clientStore';

const spotify = new Spotify();

// Action types
export const SEARCH_SONGS_CLEAR = 'SEARCH_SONGS_CLEAR';
export const SEARCH_SONGS_FAILURE = 'SEARCH_SONGS_FAILURE';
export const SEARCH_SONGS_LOADING = 'SEARCH_SONGS_LOADING';
export const SEARCH_SONGS_SUCCESS = 'SEARCH_SONGS_SUCCESS';

// Async action creators
export const searchSongsRequest = payload => {
  return dispatch => {
    dispatch(searchSongsLoading(payload));

    // TODO: move this to a redux middleware
    const storeState = store.getState();
    const accessToken = storeState.login.getIn(['data', 'access_token']);


    if (accessToken) {
      spotify.setAccessToken(accessToken);
      spotify.searchTracks(payload.query)
        .then(data => {
          dispatch(searchSongsSuccess(data));
        }, error => {
          dispatch(searchSongsFailure({ error: 'request_failure', error_description: error.message }));
        });
    } else {
      dispatch(searchSongsFailure({ error: 'invalid_token', error_description: 'Missing API Token' }));
    }
  }
};

// Sync action creators
export const searchSongsClear = () => {
  return {
    type: SEARCH_SONGS_CLEAR
  };
};
export const searchSongsFailure = error => {
  return {
    type: SEARCH_SONGS_FAILURE,
    error
  };
};
export const searchSongsLoading = payload => {
  return {
    type: SEARCH_SONGS_LOADING,
    payload
  };
};
export const searchSongsSuccess = data => {
  return {
    type: SEARCH_SONGS_SUCCESS,
    data
  };
};
