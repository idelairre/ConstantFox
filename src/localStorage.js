import * as Utils from './helpers';

const mockChromeApiWithLocalStorage = constants => {
  const storage = {};
  const storageApi = {
    get(key, callback) {
      if (typeof callback !== 'function') {
        throw new Error('"storage.get" expects a callback');
      }

      let attrs = {};
      const response = {};

      if (typeof key === 'string') {
        attrs[key] = undefined;
      } else if (typeof key === 'object') {
        attrs = key;
      }

      for (const attr in attrs) {
        const item = Utils.marshalType(localStorage.getItem(attr)) || attrs[attr];
        response[attr] = Utils.marshalFalsey(item);
      }

      return callback(response);
    },
    set(items, callback) {
      if (typeof items !== 'object') {
        throw new Error('"storage.set" expects an object');
      } else {
        for (const key in items) {
          if (Utils.isNull(items[key])) {
            localStorage.setItem(key, '`null');
          } else if (typeof items[key] === 'object') {
            localStorage.setItem(key, JSON.stringify(items[key]));
          } else {
            localStorage.setItem(key, items[key]);
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
        for (const attr in items) {
          localStorage.removeItem(attr);
          delete constants[attr];
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
