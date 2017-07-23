import { combineReducers } from 'redux';
import createPlaylistReducers from './createPlaylistReducers';
import playlistReducers from './playlistReducers';
import commonReducers from './commonReducers';

export default combineReducers(
  Object.assign({}, playlistReducers, createPlaylistReducers, commonReducers)
);
