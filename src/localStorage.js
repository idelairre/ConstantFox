import * as Utils from './helpers';

const marshalType = item => {
  if (Utils.isNumeric(item)) {
    item = parseFloat(item);
  } else if (item === '`null') { // it was intentionally stored
    return 'null';
  } else if (Utils.isNull(item)) { // default localStorage behavior
    item = null;
  } else if (Utils.isBoolean(item)) {
    item = item; // marshal later
  } else if (Utils.isObject(item)) {
    item = JSON.parse(item);
  }
  return item;
}

const marshalFalsey = item => {
  if (Utils.isString(item)) {
    if (Utils.isBoolean(item)) {
      return Utils.convertBool(item);
    } else if (Utils.isNull(item)) {
      return null;
    }
  }
  return item; // it has to be undefined
}

const mockChromeApiWithLocalStorage = constants => {
  const storage = {};
  const storageApi = {
    get(key, callback) {
      if (typeof callback !== 'function') {
        throw new Error('"storage.get" expects a callback');
      }
      if (typeof key === 'object') {
        const hash = key;
        const response = {};
        for (const _key in hash) {
          const item = marshalType(localStorage.getItem(_key)) || undefined;
          response[_key] = marshalFalsey(item);
        }
        return callback(response);
      } else if (typeof key === 'string') {
        const response = {};
        response[key] = marshalType(localStorage.getItem(key)) || undefined;
        response[key] = marshalFalsey(response[key]);
        return callback(response);
      }
    },
    set(items, callback) {
      if (typeof items !== 'object') {
        throw new Error('"storage.set" expects an object');
      } else {
        for (const key in items) {
          if (Utils.checkProperty(items, key)) {
            if (Utils.isNull(items[key])) {
             localStorage.setItem(key, '`null');
            } else if (typeof items[key] === 'object') {
              localStorage.setItem(key, JSON.stringify(items[key]));
            } else {
              localStorage.setItem(key, items[key]);
            }
          }
        }
        if (callback) {
          callback();
        }
      }
    },
    remove(key, callback) {
      if (typeof key === 'string') {
        localStorage.removeItem(key);
        delete constants[key];
        if (callback) {
          callback();
        }
      } else if (typeof key === 'object') {
        const items = key;
        for (const _key in items) {
          localStorage.removeItem(_key);
          delete constants[_key];
        }
        if (callback) {
          callback();
        }
      }
    },
    clear() {
      for (const key in constants) {
        if (Utils.checkProperty(constants, key) && typeof constants[key] !== 'function') {
          localStorage.removeItem(key);
          delete constants[key];
        }
      }
    }
  }
  storage.local = storageApi;
  return storage;
}

export default mockChromeApiWithLocalStorage;
