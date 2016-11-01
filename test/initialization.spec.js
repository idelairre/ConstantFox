import Constants from '../src/constants';
import * as Utils from '../src/helpers';

let jasmine = jasmine || {};

if (Utils.isNode()) {
  const Jasmine = require('jasmine');
  jasmine = new Jasmine();
}

describe('Constants', () => {
  describe('initialization', () => {
    it ('should emit call initialization functions', () => {
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
    })
  });
});
