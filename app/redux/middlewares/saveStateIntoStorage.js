import { saveToStorage } from '../../utilities/storageHelper';

export const SAVE_STATE_INTO_STORAGE = Symbol('Save state from storage');

export default store => next => action => {
  const saveStateIntoStorage = action[SAVE_STATE_INTO_STORAGE];

  // If saveStateIntoStorage is not defined, the action pass as it is to the next middleware
  if (typeof saveStateIntoStorage === 'undefined') {
    return next(action);
  }

  const { stateKey, storageKey } = saveStateIntoStorage;
  const storedState = {
    [storageKey]: store.getState()[stateKey]
  };

  if (storedState) {
    saveToStorage(storedState);
  }

  // Pass the original action
  next(action);
};
