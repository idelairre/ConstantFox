import * as Utils from './helpers';

const mockChromeApiWithFileSystem = constants => {
  if (!Utils.access('./constants.json')) {
    Utils.write('./constants.json', constants._defaults);
  }
  const storage = {};
  const storageApi = {
    get(key, callback) {
      if (typeof callback !== 'function') {
        throw new Error('"storage.get" expects a callback');
      }

      let attrs = {};
      const response = {};

      if (typeof key === 'string') {
        attrs[key] = '';
      } else if (typeof key === 'object') {
        attrs = key;
      }

      for (const attr in attrs) {
        const item = Utils.marshalType(Utils.read('./constants.json')[attr]) || attrs[attr];
        response[attr] = Utils.marshalFalsey(item);
      }

      return callback(response);
    },
    set(items, callback) {
      if (typeof items !== 'object') {
        throw new Error('"storage.set" expects an object');
      }
      const saved = Utils.read('./constants.json');
      for (const key in items) {
        if (Utils.isNull(items[key])) {
          saved[key] = '`null';
        } else if (Utils.isBoolean(items[key])) {
          saved[key] = items[key].toString();
        } else if (typeof items[key] === 'object') {
          saved[key] = JSON.stringify(items[key]);
        } else {
          saved[key] = items[key];
        }
      }
      Utils.write('./constants.json', saved);
      if (callback) {
        callback();
      }
    },
    remove(key, callback) {
      if (typeof key === 'string') {
        const saved = Utils.read('./constants.json');
        delete saved[key];
        delete constants[key];
        Utils.write('./constants.json', saved);
        if (callback) {
          callback();
        }
      } else if (typeof key === 'object') {
        const items = key;
        const saved = Utils.read('./constants.json');
        for (const attr in items) {
          if (Utils.checkProperty(constants, attr)) {
            delete saved[attr];
            delete constants[attr];
          }
        }
        Utils.write('./constants.json', constants);
        if (callback) {
          callback();
        }
      }
    },
    clear() {
      for (const key in constants) {
        if (Utils.checkProperty(constants, key) && typeof constants[key] !== 'function') {
          this.remove(key);
          delete constants[key];
        }
      }
    }
  }
  storage.local = storageApi;
  return storage;
}

export default mockChromeApiWithFileSystem;
