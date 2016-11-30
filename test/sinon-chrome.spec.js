import Constants from '../src/constants';
import * as Utils from '../src/helpers';

let jasmine = jasmine || {};

if (Utils.isNode()) {
  global.chrome = require('sinon-chrome');
  const Jasmine = require('jasmine');
  jasmine = new Jasmine();
  Utils.clear('./constants.json');
  global.window = {};
  window.chrome = chrome;

  const defaults = {
    nextLikeSourceSlug: {
      page: null,
      url: null
    }
  };

  describe('chrome storage mock', () => {
    it ('should work', () => {
      const constants = new Constants();
      expect(constants).toBeDefined();
    });

    it ('should set the default environment to chrome', () => {
      const constants = new Constants();
      expect(constants.getEnv()).toEqual('chrome');
    });
  });
}

if (Utils.isNode()) {
  jasmine.execute();
}
