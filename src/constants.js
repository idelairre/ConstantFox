import EventEmitter from 'eventemitter3';
import fs from 'fs';
import path from 'path';
import mockChromeApiWithFileSystem from './filesystem';
import mockChromeApiWithLocalStorage from './localStorage';
import * as Utils from './helpers';
import './polyfill';

export default class Constants extends EventEmitter {
  _previous = {};
  _debug = false;
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
      for (const key in options) {
        if (Utils.checkProperty(options, key)) {
          if (!this.get(key)) {
            this.set(key, options[key]);
          }
        }
      }
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
      this.storage = mockChromeApiWithFileSystem(this);
      this.env = 'node';
    } else if (Utils.isChromeExtension()) {
      this.storage.local = chrome.storage.local;
      this.env = 'chrome';
    } else if (Utils.isBrowser()) {
      this.storage = mockChromeApiWithLocalStorage(this);
      this.env = 'browser';
    } else {
      throw new Error('Cannot detect JavaScript context');
    }
    if (callback) {
      return callback();
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
        if (Utils.checkProperty(hash, _key)) {
          if (this[_key]) {
            response[_key] = this[_key];
          } else {
            response[_key] = hash[_key];
            this.set(_key, hash[_key]);
          }
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
      this._previous[key] = this[key];
      this[key] = value;
      const storageSlug = {}; // NOTE: you need to use this pattern in order to programmatically set chrome storage key value pairs
      storageSlug[key] = value;
      this.storage.local.set(storageSlug);
    }
    this.emit('change', this.toJSON());
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
      if (Utils.checkProperty(items, key)) {
        if (typeof this[key] === 'undefined' && !this.initialized) {
          this._previous[key] = items[key];
        } else if (typeof this[key] === 'undefined' && this.initialized) {
          this._previous[key] = undefined;
        } else {
          this._previous[key] = this[key];
        }
        this[key] = items[key];
      }
    }
  }

  _initializeStorageValues(callback) {
    this.storage.local.get(this.defaults, items => {
      this._assign(items);
      if (callback) {
        callback();
      }
    });
  }
}
