import { combineReducers } from 'redux';
import createPlaylistReducers from './createPlaylistReducers';
import loginReducers from './loginReducers';
import playlistReducers from './playlistReducers';
import removePlaylistReducers from './removePlaylistReducers';

export default combineReducers(
  Object.assign({}, loginReducers, playlistReducers, createPlaylistReducers, removePlaylistReducers)
);
