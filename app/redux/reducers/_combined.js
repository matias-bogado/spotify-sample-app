import { combineReducers } from 'redux';
import createPlaylistReducers from './createPlaylistReducers';
import loginReducers from './loginReducers';
import playlistReducers from './playlistReducers';
import removePlaylistReducers from './removePlaylistReducers';
import songsReducers from './songsReducers';

export default combineReducers(
  Object.assign({}, loginReducers, songsReducers, playlistReducers, createPlaylistReducers, removePlaylistReducers)
);
