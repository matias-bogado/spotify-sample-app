import { READ_STATE_FROM_STORAGE } from '../middlewares/readStateFromStorage';
import { SAVE_STATE_INTO_STORAGE } from '../middlewares/saveStateIntoStorage';

// Action types
export const PLAYLIST_CLEAR = 'PLAYLIST_CLEAR';
export const PLAYLIST_ADD_SONG = 'PLAYLIST_ADD_SONG';
export const PLAYLIST_REMOVE_SONG = 'PLAYLIST_REMOVE_SONG';
export const PLAYLIST_SAVE_INTO_LOCAL_STORAGE = 'PLAYLIST_SAVE_INTO_LOCAL_STORAGE';
export const PLAYLIST_READ_FROM_LOCAL_STORAGE = 'PLAYLIST_READ_FROM_LOCAL_STORAGE';
export const PLAYLIST_LOAD_STATE_FROM_LOCAL_STORAGE = 'PLAYLIST_READ_FROM_LOCAL_STORAGE';

// Sync action creators
export const playlistClear = ({ playlistId }) => {
  return {
    type: PLAYLIST_CLEAR
  };
};

export const playlistAddSong = ({ playlistId, song }) => {
  return {
    type: PLAYLIST_ADD_SONG,
    playlistId,
    song
  };
};

export const playlistRemoveSong = ({ playlistId, songId }) => {
  return {
    type: PLAYLIST_CLEAR,
    playlistId,
    songId
  };
};

export const playlistSaveIntoLocalStorage = () => {
  return {
    type: PLAYLIST_SAVE_INTO_LOCAL_STORAGE,
    [SAVE_STATE_INTO_STORAGE]: {
      stateKey: 'playlist',
      storageKey: 'playlist'
    }
  };
};

export const playlistReadFromLocalStorage = () => {
  return {
    type: PLAYLIST_READ_FROM_LOCAL_STORAGE,
    [READ_STATE_FROM_STORAGE]: {
      actionLoad: playlistLoadStateFromLocalStorage,
      storageKey: 'playlist'
    }
  };
};

export const playlistLoadStateFromLocalStorage = storedState => {
  return {
    type: PLAYLIST_LOAD_STATE_FROM_LOCAL_STORAGE,
    storedState
  };
};
