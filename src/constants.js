import EventEmitter from 'eventemitter3';
import fs from 'fs';
import path from 'path';
import mockChromeApiWithFileSystem from './filesystem';
import mockChromeApiWithLocalStorage from './localStorage';
import * as Utils from './helpers';
import packageJson from '../package.json';
import './polyfill';

export default class Constants extends EventEmitter {
  _previous = {};
  _defaults = {};
  _storage = {
    local: {},
    sync: {}
  };
  _env = null;
  _initialized = false;

  static VERSION = packageJson.version;

  constructor(options) {
    super();

    Object.assign(this._defaults, options);

    this.once('initialized', () => {
      this._storage.local.get(options, vals => {
        this.set(Utils.merge(options, vals), null, { init: true });
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

  static once() {
    return Constants.prototype.once.apply(Constants.prototype, arguments);
  }

  static on() {
    return Constants.prototype.on.apply(Constants.prototype, arguments);
  }

  static addListener() {
    return Constants.prototype.addListener.apply(Constants.prototype, arguments);
  }

  getEnv() {
    return this._env;
  }

  _detectContext(callback) { // TODO: add a delete or clear function so that storage can be reset
    if (Utils.isNode()) {
      this._storage = mockChromeApiWithFileSystem(this);
      this._env = 'node';
    } else if (Utils.isChromeExtension()) {
      this._storage.local = chrome.storage.local;
      this._env = 'chrome';
    } else if (Utils.isBrowser()) {
      this._storage = mockChromeApiWithLocalStorage(this);
      this._env = 'browser';
    } else {
      throw new Error('Cannot detect JavaScript context');
    }
    if (callback) {
      return callback();
    }
  }

  clear() {
    this._storage.local.clear();
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
    if (typeof key === 'object') {
      this._assign(key);
      this._storage.local.set(key);
    } else {
      this._previous[key] = this[key];
      this[key] = value;
      const storageSlug = {}; // NOTE: you need to use this pattern in order to programmatically set chrome storage key value pairs
      storageSlug[key] = value;
      this._storage.local.set(storageSlug);
    }
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

  _assign(items) {
    const keys = Object.keys(items);
    for (let i = keys.length - 1; i >= 0; i--) {
      this[keys[i]] = items[keys[i]];
      if (typeof this[keys[i]] === 'undefined') {
        this._previous[keys[i]] = undefined;
      } else {
        this._previous[keys[i]] = this[keys[i]];
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
