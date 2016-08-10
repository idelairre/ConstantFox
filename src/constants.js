import EventEmitter from 'eventemitter3';
import fs from 'fs';
import * as Utils from './helpers';

export default class Constants extends EventEmitter {
  _previous = {};
  defaults = {};
  storage = {
    local: {},
    sync: {}
  };
  env = null;
  initialized = false;

  constructor(options) {
    super();
    Object.assign(this.defaults, options);
    this.once('ready', () => {
      this.set(options);
    });
    this.detectContext(::this.initialize);
  }

  initialize() {
    this._initializeStorageValues(() => {
      if (this.initialized) {
        this.emit('reset');
        return;
      }
      this.initialized = true;
      this.emit('ready');
    });
  }

  detectContext(callback) { // TODO: add a delete or clear function so that storage can be reset
    if (Utils.isNode()) {
      this.storage = this.mockChromeApiWithFileSystem();
      this.env = 'node';
    } else if (Utils.isChromeExtension()) {
      this.storage.local = chrome.storage.local;
      this.env = 'chrome';
    } else if (Utils.isBrowser()) {
      this.storage = this.mockChromeApiWithLocalStorage();
      this.env = 'browser';
    } else {
      throw new Error('Cannot detect JavaScript context');
    }
    if (callback) {
      return callback();
    }
  }

  mockChromeApiWithFileSystem() {
    const constants = this;
    fs.writeFileSync('./src/constants.json', JSON.stringify(this.defaults), 'utf8');
    return {
      local: {
        get(key, callback) {
          if (typeof callback !== 'function') {
            throw new Error('"storage.get" expects a callback');
          }
          if (typeof key === 'object') {
            const hash = key;
            const response = {};
            for (const _key in hash) {
              const item = JSON.parse(fs.readFileSync('./src/constants.json'))[_key];
              if (item) {
                response[_key] = item;
              } else {
                this[_key] = hash[_key];
                response[_key] = this[_key];
              }
            }
            return callback(response);
          } else if (typeof key === 'string') {
            const response = {};
            const item = JSON.parse(fs.readFileSync('./src/constants.json'))[key];
            if (item) {
              response[key] = item;
            }
            return callback(response);
          }
        },
        set(items, callback) {
          if (typeof items !== 'object') {
            throw new Error('"storage.set" expects an object');
          } else {
            const constants = JSON.parse(fs.readFileSync('./src/constants.json'));
            for (const key in items) {
              if ({}.hasOwnProperty.call(items, key)) {
                constants[key] = items[key];
              }
            }
            fs.writeFileSync('./src/constants.json', JSON.stringify(constants));
            if (callback) {
              callback();
            }
          }
        },
        remove(key, callback) {
          if (typeof key === 'string') {
            const saved = JSON.parse(fs.readFileSync('./src/constants.json'));
            delete saved[key];
            delete constants[key];
            fs.writeFileSync('./src/constants.json', JSON.stringify(saved));
            if (callback) {
              callback();
            }
          } else if (typeof key === 'object') {
            const items = key;
            const saved = JSON.parse(fs.readFileSync('./src/constants.json'));
            for (const _key in items) {
              if ({}.hasOwnProperty.call(constants, _key)) {
                delete saved[_key];
                delete constants[_key];
              }
            }
            fs.writeFileSync('./src/constants.json', JSON.stringify(constants));
            if (callback) {
              callback();
            }
          }
        },
        clear() {
          for (const key in constants) {
            if ({}.hasOwnProperty.call(constants, key) && typeof constants[key] !== 'function') {
              this.remove(key);
              delete constants[key];
            }
          }
        }
      }
    }
  }

  mockChromeApiWithLocalStorage() {
    const constants = this;
    return {
      local: {
        get(key, callback) {
          if (typeof callback !== 'function') {
            throw new Error('"storage.get" expects a callback');
          }
          if (typeof key === 'object') {
            const hash = key;
            const response = {};
            for (const _key in hash) {
              const item = localStorage.getItem(_key);
              response[_key] = item;
            }
            return callback(response);
          } else if (typeof key === 'string') {
            const response = {};
            response[key] = localStorage.getItem(key);
            return callback(response);
          }
        },
        set(items, callback) {
          if (typeof items !== 'object') {
            throw new Error('"storage.set" expects an object');
          } else {
            for (const key in items) {
              if ({}.hasOwnProperty.call(items, key)) {
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
            if ({}.hasOwnProperty.call(constants, key) && typeof constants[key] !== 'function') {
              localStorage.removeItem(key);
              delete constants[key];
            }
          }
        }
      }
    }
  }

  clear() {
    this.storage.local.clear();
  }

  get(key) {
    if (typeof key === 'object') {
      const response = {};
      const hash = key;
      for (const _key in hash) {
        if ({}.hasOwnProperty.call(hash, _key) && this[_key]) {
          response[_key] = this[_key];
        }
      }
      return response;
    } else if (typeof key === 'string') {
      return this[key];
    }
  }

  set(key, value) {
    if (typeof key === 'object') {
      this._assign(key);
      this.storage.local.set(key);
    } else {
      this[key] = value;
      const storageSlug = {}; // NOTE: you need to use this pattern in order to programmatically set chrome storage key value pairs
      storageSlug[key] = value;
      this.storage.local.set(storageSlug);
    }
    this.emit('change', this.toJSON);
  }

  remove(key) {
    return this.storage.local.remove(key)
  }

  previous(key) {
    if (!key) {
      return this._previous;
    }
    return this._previous[key];
  }

  reset() {
    this.set(this.defaults);
    this.initialize();
  }

  toJSON() {
    const vals = {};
    Object.keys(this.defaults).forEach(key => {
      vals[key] = this[key];
    });
    return Object.assign({}, vals);
  }

  _assign(items) {
    for (const key in items) {
      if ({}.hasOwnProperty.call(items, key)) {
        if (typeof this.key === 'undefined') {
          this._previous[key] = items[key]; // we'll assume here this is on initialization
        } else {
          this._previous[key] = this[key];
        }
        this[key] = items[key];
      }
    }
  }

  _initializeStorageValues(callback) {
    this.storage.local.get(this.defaults, items => {
      Object.assign(this, items);
      if (callback) {
        callback();
      }
    });
  }
}
