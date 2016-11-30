import Constants from '../src/constants';
import * as Utils from '../src/helpers';

let jasmine = jasmine || {};

if (Utils.isNode()) {
  const Jasmine = require('jasmine');
  jasmine = new Jasmine();
  Utils.clear('./constants.json');
}

const defaults = {
  nextLikeSourceSlug: {
    page: null,
    url: null
  }
};

const testVals = {
  page: 1,
  url: 'https://www.tumblr.com/likes'
};

describe('Constants', () => {
  beforeAll(() => {

    const constants = new Constants(defaults);

    constants.set('nextLikeSourceSlug', testVals);

  });

  describe('constructor', () => {
    it ('should emit ready event', () => {

      spyOn(Constants.prototype, 'emit').and.callThrough();

      const test = new Constants(defaults);
      expect(Constants.prototype.emit).toHaveBeenCalled();
      expect(Constants.prototype.emit.calls.argsFor(2)).toEqual(['ready']);
    });

    it ('should make values available on ready', done => {
      let test;
      Constants.prototype.once('ready', () => {
        if (test) {
          expect(test.get('nextLikeSourceSlug')).toEqual(testVals);
          done();
        } else {
          setTimeout(() => {
            expect(test.get('nextLikeSourceSlug')).toEqual(testVals);
            done();
          });
        }
      });
      test = new Constants(defaults);
    });
  });

  describe('initialization', () => {
    it ('should call initialization functions', () => {
      spyOn(Constants.prototype, 'initialize').and.callThrough();
      spyOn(Constants.prototype, '_detectContext').and.callThrough();
      const constants = new Constants();

      expect(Constants.prototype.initialize).toHaveBeenCalled();
      expect(Constants.prototype._detectContext).toHaveBeenCalled();
    });

    it ('should emit initialization events', () => {
      spyOn(Constants.prototype, 'emit').and.callThrough();

      const constants = new Constants();
      expect(Constants.prototype.emit).toHaveBeenCalled();
      expect(Constants.prototype.emit.calls.argsFor(0)).toEqual(['initialized']);
    });
  });
});

if (Utils.isNode()) {
  jasmine.execute();
}
