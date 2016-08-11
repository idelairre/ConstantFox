import fs from 'fs';
import Constants from '../src/constants';
import * as Utils from '../src/helpers';

let jasmine = jasmine || {};

if (Utils.isNode()) {
  const Jasmine = require('jasmine');
  jasmine = new Jasmine();
}

describe('Constants', () => {
  beforeAll(() => {
    const constants = new Constants();
    for (let i = 0; i < 11; i += 1) {
      constants.set('i', i);
    }
  });
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
      expect(constants.getEnv()).toEqual('browser');
    } else {
      expect(constants.getEnv()).toEqual('node');
    }
  });

  it ('should assign default values to the "_previous" hash', () => {
    const constants = new Constants({
      i: 0
    });
    expect(constants.previous('i')).toEqual(0);
    expect(constants.get('i')).toEqual(10);
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

    it ('should persist values to local storage or file system', () => {
      if (Utils.isBrowser()) {
        expect(localStorage.getItem('billy')).toEqual('hey billy');
        expect(localStorage.getItem('oh')).toEqual('raw');
      } else {
        const constants = Utils.read('./constants.json');
        expect(constants.billy).toEqual('hey billy');
        expect(constants.oh).toEqual('raw');
      }
    });

    it ('should convert numbers and booleans to their corresponding types on access', () => {
      const vals = {
        truth: false,
        number: 10,
        null: null
      };
      const constants = new Constants(vals);
      expect(constants.get('truth')).toBe(false);
      expect(constants.get('number')).toEqual(10);
      expect(constants.get('null')).toEqual(null);
    });

    it ('should allow new instances of "Constants" to access stored items', () => {
      const vals = {
        billy: '',
        oh: ''
      };
      const constants = new Constants(vals);
      expect(constants.get('billy')).toEqual('hey billy');
      expect(constants.get('oh')).toEqual('raw');
    });

    it ('should use arguments as the response values when unassigned values are requested', () => {
      const constants = new Constants({
        top: 'kek'
      });
      expect(constants.get({ omg: 'lol' })).toEqual({ omg: 'lol' });
      expect(constants.get('omg')).toEqual('lol');
    });
  });

  // describe('clear()', () => {
  //   it ('should remove all managed values from local storage', () => {
  //     const constants = new Constants({
  //       balls: 'wtf',
  //       derp: 'herp'
  //     });
  //     constants.clear();
  //     expect(constants.get('balls')).toBeUndefined();
  //     expect(constants.get('derp')).toBeUndefined();
  //   });
  // });
  //
  // describe('remove()', () => {
  //   it ('should remove the given key from storage', () => {
  //     const constants = new Constants({
  //       meep: 'meep',
  //     });
  //     constants.remove('meep');
  //     expect(constants.get('meep')).toBeUndefined();
  //   });
  // });
});

if (Utils.isNode()) {
  jasmine.execute();
}
