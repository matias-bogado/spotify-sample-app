import { Map } from 'immutable';

const serverMetadataInitialState = new Map({
  // TODO: fill with props (server last update, build version, etc)
  userAgent: ''
});

export const serverMetadata = (state = serverMetadataInitialState, action = {}) => {
  return state;
};

export default {
  serverMetadata
};
