import fs from 'fs';
import Jasmine from 'jasmine';
import mockChromeApiWithFileSystem from '../src/filesystem';
import * as Utils from '../src/helpers';

jasmine = new Jasmine();

const constants = {
  defaults: {
    shelly: 'john',
    friends: 'are my',
    people: 'they know',
    neck: 'cure'
  }
};

Utils.write('./constants.json', constants.defaults);

const storage = mockChromeApiWithFileSystem(constants);

describe('mockChromeApiWithFileSystem', () => {
  it ('should mirror the chrome extension storage api', () => {
    expect(storage.local).toBeDefined();
  });

  describe('get', () => {
    it ('should return stored values', () => {
      const test = {
        shelly: '',
        friends: '',
        people: '',
        neck: ''
      };
      storage.local.get(test, items => {
        expect(items).toEqual(constants.defaults);
      });
    });
  });
});

jasmine.execute();
