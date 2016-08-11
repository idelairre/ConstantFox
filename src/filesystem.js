import * as Utils from './helpers';

const mockChromeApiWithFileSystem = constants => {
  if (!Utils.access('./constants.json')) {
    Utils.write('./constants.json', constants.defaults);
  } else {
    const vals = Utils.read('./constants.json');
    if (!Utils.isEqual(constants.defaults, vals)) {
      Object.assign(constants.defaults, vals);
      Utils.write('./constants.json', constants.defaults);
    }
  }
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
          const value = Utils.read('./constants.json')[_key];
          if (value) {
            constants[_key] = value;
            response[_key] = value;
          } else {
            constants[_key] = hash[_key];
            response[_key] = constants[_key];
          }
        }
        return callback(response);
      } else if (typeof key === 'string') {
        const response = {};
        const item = Utils.read('./constants.json')[key];
        if (item) {
          response[key] = item;
        }
        return callback(response);
      }
    },
    set(items, callback) {
      if (typeof items !== 'object') {
        throw new Error('"storage.set" expects an object');
      }
      const saved = Utils.read('./constants.json');
      for (const key in items) {
        if (Utils.checkProperty(items, key)) {
          saved[key] = items[key];
        }
      }
      Utils.write('./constants.json', constants);
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
        for (const _key in items) {
          if (Utils.checkProperty(constants, _key)) {
            delete saved[_key];
            delete constants[_key];
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
