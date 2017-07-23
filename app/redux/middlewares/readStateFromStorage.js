import { getFromStorage } from '../../utilities/storageHelper';

export const READ_STATE_FROM_STORAGE = Symbol('Read state from storage');

export default store => next => action => {
  const readStateFromStorage = action[READ_STATE_FROM_STORAGE];

  // If readStateFromStorage is not defined, the action pass as it is to the next middleware
  if (typeof readStateFromStorage === 'undefined') {
    return next(action);
  }

  const { storageKey, actionLoad } = readStateFromStorage;
  const storedState = getFromStorage(storageKey);

  // Pass the original action, just to keep tracking of it
  next(action);
  // Pass the load action to the next middleware
  next(actionLoad(storedState));
};
