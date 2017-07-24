import { combineReducers } from 'redux';
import createPlaylistReducers from './createPlaylistReducers';
import removePlaylistReducers from './removePlaylistReducers';
import playlistReducers from './playlistReducers';

export default combineReducers(
  Object.assign({}, playlistReducers, createPlaylistReducers, removePlaylistReducers)
);
