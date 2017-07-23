import _ from 'lodash';

/**
 * Save the given items into storage
 * @param items
 */
export const saveToStorage = (items) => {
  if (localStorage) {
    if (_.isPlainObject(items)) {
      _.map(items, (value, key) => {
        const parsedValue = (_.isObject(value)) ? JSON.stringify(value) : value;

        localStorage.setItem(key, parsedValue);
      });
    } else {
      console.warn('saveToStorage -> "items" should be a plain object');
    }
  }
};

/**
 * Remove the given items from the storage
 * @param items
 */
export const removeFromStorage = (items) => {
  if (localStorage) {
    if (_.isArray(items)) {
      items.map(itemName => localStorage.removeItem(itemName));
    } else if (_.isString(items)) {
      localStorage.removeItem(items);
    } else {
      console.warn('saveToStorage -> "items" should be a string or an array');
    }
  }
};

/**
 * Get items from the storage
 * @param items
 * @returns {*}
 */
export const getFromStorage = (items) => {
  let storedItems;

  if (localStorage) {
    if (_.isArray(items)) {
      storedItems = {};
      items.map(itemName => storedItems[itemName] = JSON.parse(localStorage.getItem(itemName)));

    } else if (_.isString(items)) {
      storedItems = JSON.parse(localStorage.getItem(items));
    } else {
      console.warn('saveToStorage -> "items" should be a string or an array');
    }
  }

  return storedItems;
};
