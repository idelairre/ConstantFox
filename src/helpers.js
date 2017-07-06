import fs from 'fs';
import path from 'path';

export const isBrowser = new Function('{ return !!window }');

export const isChrome = new Function('{ return !!window.chrome }');

export const isFirefox = new Function("{ return typeof InstallTrigger !== 'undefined'}");

export const isNode = () => !!process.title;

export const storageEnabled = () => !!chrome.storage;

export const isChromeExtension = () => isBrowser() && isChrome() && storageEnabled();

export const write = (filename, data) => {
  if (typeof data !== 'string') {
    data = JSON.stringify(data);
  }

  const file = path.join(process.cwd(), filename);
  fs.writeFileSync(file, data, 'utf8');
}

export const read = filename => {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), filename)));
}

export const clear = filename => {
  write(filename, {});
}

export const clone = object => {
  return Object.assign({}, object);
}

export const access = filename => {
  try {
    const file = path.join(process.cwd(), filename);
    if (fs.statSync(filename)) {
      return true;
    }
  } catch (err) {
    return false
  }
}

export const convertBool = test => {
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
}

export const isEmpty = item => {
  if ((Array.isArray(item) || typeof item === 'string') && item.length === 0) {
    return true;
  }

  if (typeof item === 'object' && Object.keys(item).length === 0) {
    return true;
  }

  return false;
}

export const checkProperty = (object, property) => {
  return {}.hasOwnProperty.call(object, property);
}

export const isEqual = (source, target) => {
  const sourceKeys = Object.keys(source);
  const targetKeys = Object.keys(target);
  if (source === target) {
    return true;
  }
  if (sourceKeys.length !== targetKeys.length) {
    return false;
  }
  if (sourceKeys === targetKeys) {
    for (const key in source) {
      const item = source[key];
      const test = target[key];
      if (item !== test) {
        return false;
      }
    }
    return true;
  }
}

export const isNumeric = n => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export const isBoolean = test => {
  if (typeof test === 'boolean') {
    return true;
  } else {
    if (typeof test === 'string') {
      if (test.toString().match(/true/) || test.toString().match(/false/)) {
        return true;
      }
    }
  }
  return false
}

export const isNull = test => {
  if (String(test) === 'null') {
    return true;
  }
  return false;
}

export const isString = test => {
  return typeof test === 'string';
}

export const isObject = test => {
  try {
    if (JSON.parse(test)) {
      return true;
    }
  } catch (err) {
    return false;
  }
}

export const isUndefined = test => {
  if (typeof test === 'string' && test === 'undefined') {
    return true;
  } else if (typeof test === 'undefined') {
    return true;
  }

  return false;
}

export const merge = (source, target) => {
  if (!source) {
    throw new Error('source is invalid');
  } else if (!target) {
    throw new Error('target is invalid');
  }
  const newObj = Object.assign({}, source);
  const keys = Object.keys(target);
  for (let i = keys.length - 1; i >= 0; i--) {
    if (typeof target[keys[i]] !== 'undefined') {
      newObj[keys[i]] = target[keys[i]];
    }
  }
  return newObj;
}

export const marshalType = item => {
  if (isNumeric(item)) {
    item = parseFloat(item);
  } else if (item === '`null') { // it was intentionally stored
    return 'null';
  } else if (isNull(item)) { // default localStorage behavior
    item = null;
  } else if (isBoolean(item)) {
    item = item; // marshal later
  } else if (isUndefined(item)) {
    item = undefined;
  } else if (isObject(item)) {
    item = JSON.parse(item);
  }
  return item;
}

export const marshalFalsey = item => {
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
}
