export const isBrowser = new Function("try {return window;}catch(e){ return false;}");
export const isChrome = new Function("try {return ('chrome' in window);}catch(e){return false;}");
export const isNode = new Function("try {return process.title;}catch(e){return false;}");
export const storageEnabled = new Function("typeof chrome.storage !== 'undefined'");
export const isChromeExtension = () => isBrowser() && isChrome() && storageEnabled();

if (typeof Object.assign !== 'function') {
  Object.assign = function(target) {
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
