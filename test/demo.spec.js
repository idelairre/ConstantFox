import Constants from '../lib/constants-fox.min';
import * as Utils from '../src/helpers';

let jasmine = jasmine || {};

if (Utils.isNode()) {
  const Jasmine = require('jasmine');
  jasmine = new Jasmine();
}

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe('Constants', () => {
  it ('should work', () => {
    const constants = new Constants({
      lol: 'lol'
    });
    expect(constants).toBeDefined();
  });

  it ('should utilize the correct storage strategy depending on the environment', () => {
    const constants = new Constants({
      ohShit: 'whaddup'
    });
    if (Utils.isBrowser()) {
      expect(constants.env).toEqual('browser');
    } else {
      expect(constants.env).toEqual('node');
    }
  });

  describe('get()', () => {
    it ('should return the value indexed at the given key', () => {
      const vals = {
        billy: 'hey billy',
        oh: 'raw'
      };
      const constants = new Constants(vals);
      expect(constants.get('billy')).toEqual('hey billy');
      expect(constants.get('oh')).toEqual('raw');
      expect(constants.get({ billy: '', oh: '' })).toEqual(vals);
    });

    it ('should persist values to local storage', () => {
      if (Utils.isBrowser()) {
        expect(localStorage.getItem('billy')).toEqual('hey billy');
        expect(localStorage.getItem('oh')).toEqual('raw');
      } else {

      }
    });
  });

  describe('clear()', () => {
    it ('should remove all managed values from local storage', () => {
      const constants = new Constants({
        balls: 'wtf',
        derp: 'herp'
      });
      constants.clear();
      expect(constants.get('balls')).toBeUndefined();
      expect(constants.get('derp')).toBeUndefined();
    });
  });

  describe('remove()', () => {
    it ('should remove the given key from storage', () => {
      const constants = new Constants({
        meep: 'meep',
      });
      constants.remove('meep');
      expect(constants.get('meep')).toBeUndefined();
    });
  });
});

if (Utils.isNode()) {
  jasmine.execute();
}
