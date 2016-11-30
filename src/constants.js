import EventEmitter from 'eventemitter3';
import mockChromeApiWithFileSystem from './filesystem';
import mockChromeApiWithLocalStorage from './localStorage';
import * as Utils from './helpers';
import packageJson from '../package.json';
import './polyfill';

export default class Constants extends EventEmitter {
  _attributes = {};
  _changing = false;
  _previous = {};
  _defaults = {};
  _changed = {};
  _storage = {
    local: {},
    sync: {}
  };
  _keys;
  _env = null;
  _initialized = false;

  static VERSION = packageJson.version;

  constructor(options = {}) {
    super();

    if (typeof options === 'object') {
      const keys = Object.keys(options);
      for (let i = keys.length - 1; i >= 0; i--) {
        this._defaults[keys[i]] = options[keys[i]];
      }
      this._keys = keys;
    }

    this.once('initialized', () => {
      this._storage.local.get(options, vals => {
        const initVals = this.set(Utils.merge(options, vals), null, { init: true });
        Object.assign(this._attributes, initVals);
        Object.assign(this._previous, this._defaults);
        this.emit('ready');
      });
    });

    this._detectContext(::this.initialize);
  }

  initialize() {
    this._initializeStorageValues(() => {
      if (this._initialized) {
        this.emit('reset');
        return;
      }
      this._initialized = true;
      this.emit('initialized');
    });
  }

  initialized() {
    return this._initialized;
  }

  getEnv() {
    return this._env;
  }

  _detectContext(callback) { // TODO: add a delete or clear function so that storage can be reset
    if (Utils.isChromeExtension()) {
      this._storage.local = chrome.storage.local;
      this._env = 'chrome';
    } else if (Utils.isBrowser()) {
      this._storage = mockChromeApiWithLocalStorage(this);
      this._env = 'browser';
    } else if (Utils.isNode()) {
      this._storage = mockChromeApiWithFileSystem(this);
      this._env = 'node';
    } else {
      throw new Error('Cannot detect JavaScript context');
    }
    if (callback) {
      return callback();
    }
  }

  changedAttributes(diff) {
    if (!diff) {
      return this.hasChanged() ? Utils.clone(this._changed) : false;
    }
    const old = this.changing ? this._previous : this._attributes;
    const changed = {};
    let hasChanged;
    for (const attr in diff) {
      const val = diff[attr];
      if (Utils.isEqual(old[attr], val)) {
        continue;
      }
      changed[attr] = val;
      hasChanged = true;
    }
    return hasChanged ? changed : false;
  }

  clear() {
    this._storage.local.clear();
  }

  hasChanged(attr) {
    if (!attr) {
      return !Utils.isEmpty(this._changed);
    }
    return Utils.checkProperty(this._changed, attr);
  }

  default(key) {
    if (this._defaults[key]) {
      return this._defaults[key];
    } else {
      throw new Error(`"${key}" does not have a default value`);
    }
  }

  defaults() {
    return this._defaults;
  }

  get(key) { // this should not call storage.get so it remains synchronous
    if (typeof key === 'object') {
      const response = {};
      const hash = key;
      const keys = Object.keys(hash);
      for (let i = keys.length - 1; i >= 0; i--) {
        if (typeof this[keys[i]] !== 'undefined') {
          response[keys[i]] = this[keys[i]];
        } else {
          response[keys[i]] = hash[keys[i]];
          this.set(keys[i], hash[keys[i]]);
        }
      }
      return response;
    } else if (typeof key === 'string') {
      return this[key];
    }
  }

  set(key, value, { init = false, silent = false, reset = false } = {}) {
    let attrs = {};
    if (typeof key === 'object') {
      attrs = key;
    } else {
      attrs[key] = value;
    }

    let changing = this._changing;
    this._changing = true;

    if (!changing) {
      this.changed = {};
    }

    this._assign(attrs, init);

    this._changing = false;
    this._storage.local.set(attrs);

    if (reset) {
      this.emit('reset', this.toJSON());
    } else if (silent) {
      Function.prototype();
    } else {
      this.emit('change', this.toJSON());
    }
  }

  remove(key) {
    return this._storage.local.remove(key);
  }

  previous(key) {
    if (!key) {
      return this._previous;
    }
    return this._previous[key];
  }

  reset(key) {
    if (typeof key === 'string') {
      this.set(key, this._defaults[key], { reset: true });
    } else {
      this.set(this._defaults, null, { reset: true });
    }
  }

  toJSON() {
    const vals = {};
    const keys = Object.keys(this._defaults);
    for (let i = keys.length - 1; i >= 0; i--) {
      vals[keys[i]] = this[keys[i]];
    }
    return Object.assign({}, vals);
  }

  _assign(items, init) {
    const keys = Object.keys(items);
    for (let i = keys.length - 1; i >= 0; i--) {
      if (!init) {
        if (typeof this[keys[i]] === 'undefined') {
          this._previous[keys[i]] = undefined;
        } else {
          this._previous[keys[i]] = this[keys[i]];
        }
      }

      this[keys[i]] = items[keys[i]];
      this._attributes = items[keys[i]];

      if (this._previous[keys[i]] === this[keys[i]]) {
        delete this._changed[keys[i]];
      } else {
        this._changed[keys[i]] = items[keys[i]];
      }
    }
  }

  _initializeStorageValues(callback) {
    this._storage.local.get(this._defaults, items => {
      Object.assign(this, items);
      if (callback) {
        callback();
      }
    });
  }
}
