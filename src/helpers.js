import fs from 'fs';
import path from 'path';

export const isBrowser = new Function("try {return window;}catch(e){ return false;}");
export const isChrome = new Function("try {return ('chrome' in window);}catch(e){return false;}");
export const isNode = new Function("try {return process.title;}catch(e){return false;}");
export const storageEnabled = new Function("typeof chrome.storage !== 'undefined'");
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
  if (test.match(/false/)) {
    return false;
  } else {
    return true;
  }
}

export const isEmpty = item => {
  if ((Array.isArray(item) || typeof item === 'string') && item.length === 0) {
    return true;
  }
  if (typeof item === 'object' && Object.keys(items).length === 0) {
    return true;
  }
  return false;
}

export const checkProperty = (object, property) => {
  return {}.hasOwnProperty.call(object, property);
}

export const isEqual = (source, target) => {
  if (source === target) {
    return true;
  }
  if (Object.keys(source).length !== Object.keys(target).length) {
    return false;
  }
  if (Object.keys(source) === Object.keys(target)) {
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
  if (test.match(/true/) || test.match(/false/)) {
    return true;
  }
  return false
}

export const isNull = test => {
  if (test.match(/null/)) {
    return true;
  }
  return false;
}
