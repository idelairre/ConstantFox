(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"), require("path"));
	else if(typeof define === 'function' && define.amd)
		define("constant-fox", ["fs", "path"], factory);
	else if(typeof exports === 'object')
		exports["constant-fox"] = factory(require("fs"), require("path"));
	else
		root["constant-fox"] = factory(root["fs"], root["path"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.marshalFalsey = exports.marshalType = exports.merge = exports.isUndefined = exports.isObject = exports.isString = exports.isNull = exports.isBoolean = exports.isNumeric = exports.isEqual = exports.checkProperty = exports.isEmpty = exports.convertBool = exports.access = exports.clone = exports.clear = exports.read = exports.write = exports.isChromeExtension = exports.storageEnabled = exports.isNode = exports.isFirefox = exports.isChrome = exports.isBrowser = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _fs = __webpack_require__(8);

	var _fs2 = _interopRequireDefault(_fs);

	var _path = __webpack_require__(9);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isBrowser = exports.isBrowser = new Function('{ return !!window }');

	var isChrome = exports.isChrome = new Function('{ return !!window.chrome }');

	var isFirefox = exports.isFirefox = new Function("{ return typeof InstallTrigger !== 'undefined'}");

	var isNode = exports.isNode = function isNode() {
	  return !!process.title;
	};

	var storageEnabled = exports.storageEnabled = function storageEnabled() {
	  return !!chrome.storage;
	};

	var isChromeExtension = exports.isChromeExtension = function isChromeExtension() {
	  return isBrowser() && isChrome() && storageEnabled();
	};

	var write = exports.write = function write(filename, data) {
	  if (typeof data !== 'string') {
	    data = JSON.stringify(data);
	  }

	  var file = _path2.default.join(process.cwd(), filename);
	  _fs2.default.writeFileSync(file, data, 'utf8');
	};

	var read = exports.read = function read(filename) {
	  return JSON.parse(_fs2.default.readFileSync(_path2.default.join(process.cwd(), filename)));
	};

	var clear = exports.clear = function clear(filename) {
	  write(filename, {});
	};

	var clone = exports.clone = function clone(object) {
	  return Object.assign({}, object);
	};

	var access = exports.access = function access(filename) {
	  try {
	    var file = _path2.default.join(process.cwd(), filename);
	    if (_fs2.default.statSync(filename)) {
	      return true;
	    }
	  } catch (err) {
	    return false;
	  }
	};

	var convertBool = exports.convertBool = function convertBool(test) {
	  if (typeof test !== 'string') {
	    test = test.toString();
	  }
	  if (test.match(/true/)) {
	    return true;
	  } else if (test.match(/false/)) {
	    return false;
	  } else {
	    throw new Error('object is not a boolean');
	  }
	};

	var isEmpty = exports.isEmpty = function isEmpty(item) {
	  if ((Array.isArray(item) || typeof item === 'string') && item.length === 0) {
	    return true;
	  }

	  if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && Object.keys(item).length === 0) {
	    return true;
	  }

	  return false;
	};

	var checkProperty = exports.checkProperty = function checkProperty(object, property) {
	  return {}.hasOwnProperty.call(object, property);
	};

	var isEqual = exports.isEqual = function isEqual(source, target) {
	  var sourceKeys = Object.keys(source);
	  var targetKeys = Object.keys(target);
	  if (source === target) {
	    return true;
	  }
	  if (sourceKeys.length !== targetKeys.length) {
	    return false;
	  }
	  if (sourceKeys === targetKeys) {
	    for (var key in source) {
	      var item = source[key];
	      var test = target[key];
	      if (item !== test) {
	        return false;
	      }
	    }
	    return true;
	  }
	};

	var isNumeric = exports.isNumeric = function isNumeric(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	};

	var isBoolean = exports.isBoolean = function isBoolean(test) {
	  if (typeof test === 'boolean') {
	    return true;
	  } else {
	    if (typeof test === 'string') {
	      if (test.toString().match(/true/) || test.toString().match(/false/)) {
	        return true;
	      }
	    }
	  }
	  return false;
	};

	var isNull = exports.isNull = function isNull(test) {
	  if (String(test) === 'null') {
	    return true;
	  }
	  return false;
	};

	var isString = exports.isString = function isString(test) {
	  return typeof test === 'string';
	};

	var isObject = exports.isObject = function isObject(test) {
	  try {
	    if (JSON.parse(test)) {
	      return true;
	    }
	  } catch (err) {
	    return false;
	  }
	};

	var isUndefined = exports.isUndefined = function isUndefined(test) {
	  if (typeof test === 'string' && test === 'undefined') {
	    return true;
	  } else if (typeof test === 'undefined') {
	    return true;
	  }

	  return false;
	};

	var merge = exports.merge = function merge(source, target) {
	  if (!source) {
	    throw new Error('source is invalid');
	  } else if (!target) {
	    throw new Error('target is invalid');
	  }
	  var newObj = Object.assign({}, source);
	  var keys = Object.keys(target);
	  for (var i = keys.length - 1; i >= 0; i--) {
	    if (typeof target[keys[i]] !== 'undefined') {
	      newObj[keys[i]] = target[keys[i]];
	    }
	  }
	  return newObj;
	};

	var marshalType = exports.marshalType = function marshalType(item) {
	  if (isNumeric(item)) {
	    item = parseFloat(item);
	  } else if (item === '`null') {
	    // it was intentionally stored
	    return 'null';
	  } else if (isNull(item)) {
	    // default localStorage behavior
	    item = null;
	  } else if (isBoolean(item)) {
	    item = item; // marshal later
	  } else if (isUndefined(item)) {
	    item = undefined;
	  } else if (isObject(item)) {
	    item = JSON.parse(item);
	  }
	  return item;
	};

	var marshalFalsey = exports.marshalFalsey = function marshalFalsey(item) {
	  if (isString(item)) {
	    if (isBoolean(item)) {
	      return convertBool(item);
	    } else if (isNull(item)) {
	      return null;
	    } else if (isUndefined(item)) {
	      return undefined;
	    }
	  }
	  return item;
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _eventemitter = __webpack_require__(6);

	var _eventemitter2 = _interopRequireDefault(_eventemitter);

	var _filesystem = __webpack_require__(3);

	var _filesystem2 = _interopRequireDefault(_filesystem);

	var _localStorage = __webpack_require__(4);

	var _localStorage2 = _interopRequireDefault(_localStorage);

	var _helpers = __webpack_require__(1);

	var Utils = _interopRequireWildcard(_helpers);

	var _package = __webpack_require__(7);

	var _package2 = _interopRequireDefault(_package);

	__webpack_require__(5);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Constants = function (_EventEmitter) {
	  _inherits(Constants, _EventEmitter);

	  function Constants() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Constants);

	    var _this = _possibleConstructorReturn(this, (Constants.__proto__ || Object.getPrototypeOf(Constants)).call(this));

	    _this._attributes = {};
	    _this._changing = false;
	    _this._previous = {};
	    _this._defaults = {};
	    _this._changed = {};
	    _this._storage = {
	      local: {},
	      sync: {}
	    };
	    _this._env = null;
	    _this._initialized = false;


	    _this._defaults = options;

	    _this.once('initialized', function () {
	      _this._storage.local.get(options, function (vals) {
	        var initVals = _this.set(Utils.merge(options, vals), null, { init: true });
	        Object.assign(_this._attributes, initVals);
	        Object.assign(_this._previous, _this._defaults);
	        _this.emit('ready');
	      });
	    });

	    _this._detectContext(_this.initialize.bind(_this));
	    return _this;
	  }

	  _createClass(Constants, [{
	    key: 'initialize',
	    value: function initialize() {
	      var _this2 = this;

	      this._initializeStorageValues(function () {
	        if (_this2._initialized) {
	          _this2.emit('reset');
	          return;
	        }

	        _this2._initialized = true;
	        _this2.emit('initialized');
	      });
	    }
	  }, {
	    key: 'initialized',
	    value: function initialized() {
	      return this._initialized;
	    }
	  }, {
	    key: 'getEnv',
	    value: function getEnv() {
	      return this._env;
	    }
	  }, {
	    key: '_detectContext',
	    value: function _detectContext(callback) {
	      // TODO: add a delete or clear function so that storage can be reset
	      if (Utils.isChromeExtension()) {
	        this._storage.local = chrome.storage.local;
	        this._env = 'chrome';
	      } else if (Utils.isFirefox() || Utils.isChrome() || Utils.isBrowser()) {
	        this._storage = (0, _localStorage2.default)(this);
	        this._env = 'browser';
	      } else if (Utils.isNode()) {
	        this._storage = (0, _filesystem2.default)(this);
	        this._env = 'node';
	      } else {
	        throw new Error('Cannot detect JavaScript context');
	      }

	      if (typeof callback === 'function') {
	        return callback();
	      }
	    }
	  }, {
	    key: 'changedAttributes',
	    value: function changedAttributes(diff) {
	      if (!diff) {
	        return this.hasChanged() ? Utils.clone(this._changed) : false;
	      }
	      var old = this.changing ? this._previous : this._attributes;
	      var changed = {};
	      var hasChanged = void 0;
	      for (var attr in diff) {
	        var val = diff[attr];
	        if (old[attr] !== val) {
	          changed[attr] = val;
	          hasChanged = true;
	        }
	      }
	      return hasChanged ? changed : false;
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this._storage.local.clear();
	    }
	  }, {
	    key: 'hasChanged',
	    value: function hasChanged(attr) {
	      if (!attr) {
	        return !Utils.isEmpty(this._changed);
	      }
	      return Utils.checkProperty(this._changed, attr);
	    }
	  }, {
	    key: 'default',
	    value: function _default(key) {
	      if (this._defaults[key]) {
	        return this._defaults[key];
	      } else {
	        throw new Error('"' + key + '" does not have a default value');
	      }
	    }
	  }, {
	    key: 'defaults',
	    value: function defaults() {
	      return this._defaults;
	    }
	  }, {
	    key: 'get',
	    value: function get(key) {
	      // this should not call storage.get so it remains synchronous
	      if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	        var response = {};
	        var hash = key;
	        var keys = Object.keys(hash);
	        for (var i = keys.length - 1; i >= 0; i--) {
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
	  }, {
	    key: 'set',
	    value: function set(key, value) {
	      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	          _ref$init = _ref.init,
	          init = _ref$init === undefined ? false : _ref$init,
	          _ref$silent = _ref.silent,
	          silent = _ref$silent === undefined ? false : _ref$silent,
	          _ref$reset = _ref.reset,
	          reset = _ref$reset === undefined ? false : _ref$reset;

	      var attrs = {};
	      if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	        attrs = key;
	      } else {
	        attrs[key] = value;
	      }

	      var changing = this._changing;
	      this._changing = true;

	      if (!changing) {
	        this._previous = Object.assign({}, this._attributes);
	        this._changed = {};
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
	  }, {
	    key: 'remove',
	    value: function remove(key) {
	      return this._storage.local.remove(key);
	    }
	  }, {
	    key: 'previous',
	    value: function previous(key) {
	      if (!key) {
	        return this._previous;
	      }
	      return this._previous[key];
	    }
	  }, {
	    key: 'previousAttributes',
	    value: function previousAttributes() {
	      return Utils.clone(this._previous);
	    }
	  }, {
	    key: 'reset',
	    value: function reset(key) {
	      if (typeof key === 'string') {
	        this.set(key, this._defaults[key], { reset: true });
	      } else {
	        this.set(this._defaults, null, { reset: true });
	      }
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      var vals = {};
	      var keys = Object.keys(this._defaults);

	      for (var i = keys.length - 1; i >= 0; i--) {
	        vals[keys[i]] = this[keys[i]];
	      }

	      return vals;
	    }
	  }, {
	    key: '_assign',
	    value: function _assign(items, init) {
	      var keys = Object.keys(items);
	      for (var i = keys.length - 1; i >= 0; i--) {
	        this[keys[i]] = items[keys[i]];
	        this._attributes[keys[i]] = items[keys[i]];

	        if (this._previous[keys[i]] !== this[keys[i]]) {
	          this._changed[keys[i]] = items[keys[i]];
	        } else {
	          delete this._changed[keys[i]];
	        }
	      }
	    }
	  }, {
	    key: '_initializeStorageValues',
	    value: function _initializeStorageValues(callback) {
	      var _this3 = this;

	      this._storage.local.get(this._defaults, function (items) {
	        Object.assign(_this3, items);
	        if (callback) {
	          callback();
	        }
	      });
	    }
	  }]);

	  return Constants;
	}(_eventemitter2.default);

	Constants.VERSION = _package2.default.version;
		exports.default = Constants;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _helpers = __webpack_require__(1);

	var Utils = _interopRequireWildcard(_helpers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var mockChromeApiWithFileSystem = function mockChromeApiWithFileSystem(constants) {
	  if (!Utils.access('./constants.json')) {
	    Utils.write('./constants.json', constants._defaults);
	  }
	  var storage = {};
	  var storageApi = {
	    get: function get(key, callback) {
	      if (typeof callback !== 'function') {
	        throw new Error('"storage.get" expects a callback');
	      }

	      var attrs = {};
	      var response = {};

	      if (typeof key === 'string') {
	        attrs[key] = '';
	      } else if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	        attrs = key;
	      }

	      var json = Utils.read('./constants.json');

	      for (var attr in attrs) {
	        var item = Utils.marshalType(json[attr]) || attrs[attr];
	        response[attr] = Utils.marshalFalsey(item);
	      }

	      return callback(response);
	    },
	    set: function set(items, callback) {
	      if ((typeof items === 'undefined' ? 'undefined' : _typeof(items)) !== 'object') {
	        throw new Error('"storage.set" expects an object');
	      }
	      var saved = Utils.read('./constants.json');
	      for (var key in items) {
	        if (Utils.isNull(items[key])) {
	          saved[key] = '`null';
	        } else if (Utils.isBoolean(items[key])) {
	          saved[key] = items[key].toString();
	        } else if (_typeof(items[key]) === 'object') {
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
	    remove: function remove(key, callback) {
	      if (typeof key === 'string') {
	        var saved = Utils.read('./constants.json');
	        delete saved[key];
	        delete constants[key];
	        Utils.write('./constants.json', saved);
	        if (callback) {
	          callback();
	        }
	      } else if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	        var items = key;
	        var _saved = Utils.read('./constants.json');
	        for (var attr in items) {
	          if (Utils.checkProperty(constants, attr)) {
	            delete _saved[attr];
	            delete constants[attr];
	          }
	        }
	        Utils.write('./constants.json', constants);
	        if (callback) {
	          callback();
	        }
	      }
	    },
	    clear: function clear() {
	      for (var key in constants) {
	        if (Utils.checkProperty(constants, key) && typeof constants[key] !== 'function') {
	          this.remove(key);
	          delete constants[key];
	        }
	      }
	    }
	  };
	  storage.local = storageApi;
	  return storage;
	};

	exports.default = mockChromeApiWithFileSystem;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _helpers = __webpack_require__(1);

	var Utils = _interopRequireWildcard(_helpers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var mockChromeApiWithLocalStorage = function mockChromeApiWithLocalStorage(constants) {
	  var storage = {};
	  var storageApi = {
	    get: function get(key, callback) {
	      if (typeof callback !== 'function') {
	        throw new Error('"storage.get" expects a callback');
	      }

	      var attrs = {};
	      var response = {};

	      if (typeof key === 'string') {
	        attrs[key] = undefined;
	      } else if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	        attrs = key;
	      }

	      for (var attr in attrs) {
	        var item = Utils.marshalType(localStorage.getItem(attr)) || attrs[attr];
	        response[attr] = Utils.marshalFalsey(item);
	      }

	      return callback(response);
	    },
	    set: function set(items, callback) {
	      if ((typeof items === 'undefined' ? 'undefined' : _typeof(items)) !== 'object') {
	        throw new Error('"storage.set" expects an object');
	      } else {
	        for (var key in items) {
	          if (Utils.isNull(items[key])) {
	            localStorage.setItem(key, '`null');
	          } else if (_typeof(items[key]) === 'object') {
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
	    remove: function remove(key, callback) {
	      if (typeof key === 'string') {
	        localStorage.removeItem(key);
	        delete constants[key];
	        if (callback) {
	          callback();
	        }
	      } else if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	        var items = key;
	        for (var attr in items) {
	          localStorage.removeItem(attr);
	          delete constants[attr];
	        }
	        if (callback) {
	          callback();
	        }
	      }
	    },
	    clear: function clear() {
	      for (var key in constants) {
	        if (Utils.checkProperty(constants, key) && typeof constants[key] !== 'function') {
	          localStorage.removeItem(key);
	          delete constants[key];
	        }
	      }
	    }
	  };
	  storage.local = storageApi;
	  return storage;
	};

	exports.default = mockChromeApiWithLocalStorage;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	if (typeof Object.assign !== 'function') {
	  Object.assign = function (target) {
	    'use strict';

	    if (target === null) {
	      throw new TypeError('Cannot convert undefined or null to object');
	    }

	    target = Object(target);
	    for (var index = 1; index < arguments.length; index++) {
	      var source = arguments[index];
	      if (source !== null) {
	        for (var key in source) {
	          if (Object.prototype.hasOwnProperty.call(source, key)) {
	            target[key] = source[key];
	          }
	        }
	      }
	    }
	    return target;
	  };
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var has = Object.prototype.hasOwnProperty;

	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;

	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} [once=false] Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }

	/**
	 * Hold the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var events = this._events
	    , names = []
	    , name;

	  if (!events) return names;

	  for (name in events) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }

	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }

	  return names;
	};

	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];

	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];

	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }

	  return ee;
	};

	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return this;

	  var listeners = this._events[evt]
	    , events = [];

	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }

	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }

	  return this;
	};

	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;

	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = {
		"name": "constant-fox",
		"version": "0.0.19",
		"description": "",
		"main": "lib/constant-fox.js",
		"files": [
			"lib",
			"src"
		],
		"scripts": {
			"clean": "rimraf lib dist",
			"lint": "eslint src test",
			"test": "karma start karma/karma.config.development.js",
			"test:node": "find ./test -name '*.spec.js' | xargs -L 1 babel-node",
			"test:teamcity": "karma start karma/karma.config.production.js",
			"build:umd": "webpack src/constants.js --config webpack/webpack.config.development.js",
			"build:umd:min": "webpack src/constants.js --config webpack/webpack.config.production.js",
			"build": "npm run clean && npm run build:umd && npm run build:umd:min"
		},
		"npmName": "constant-fox",
		"author": "Ian Delairre <idelairre@gmail.com>",
		"license": "MIT",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/idelairre/ConstantsFox"
		},
		"bugs": {
			"url": "https://github.com/idelairre/ConstantsFox/issues"
		},
		"keywords": [
			"constants"
		],
		"devDependencies": {
			"babel-core": "^6.7.2",
			"babel-eslint": "^4.1.0",
			"babel-loader": "^6.2.4",
			"babel-plugin-add-module-exports": "^0.2.1",
			"babel-plugin-transform-class-properties": "^6.9.0",
			"babel-preset-es2015": "^6.5.0",
			"babel-preset-stage-0": "^6.5.0",
			"babel-runtime": "^6.5.x",
			"eslint": "^1.7.1",
			"jasmine": "^2.4.1",
			"jasmine-core": "^2.4.1",
			"json-loader": "^0.5.4",
			"karma": "^0.13.9",
			"karma-chrome-launcher": "^1.0.1",
			"karma-firefox-launcher": "^1.0.0",
			"karma-htmlfile-reporter": "latest",
			"karma-jasmine": "^0.3.8",
			"karma-phantomjs-launcher": "latest",
			"karma-teamcity-reporter": "latest",
			"karma-webpack-with-fast-source-maps": "^1.10.0",
			"phantomjs": "^2.1.3",
			"rimraf": "^2.3.4",
			"sinon": "^2.0.0-pre.4",
			"webpack": "^1.12.13"
		},
		"dependencies": {
			"babel-cli": "^6.11.4"
		}
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("fs");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ })
/******/ ])
});
;
//# sourceMappingURL=constant-fox.js.map