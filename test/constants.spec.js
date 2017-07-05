import Constants from '../src/constants';
import * as Utils from '../src/helpers';

let jasmine = jasmine || {};

if (Utils.isNode()) {
  const Jasmine = require('jasmine');
  jasmine = new Jasmine();
  Utils.clear('./constants.json');
} else {
  localStorage.clear();
}

describe('Constants', () => {
  beforeAll(() => {
    const constants = new Constants();
    for (let i = 0; i < 11; i += 1) {
      constants.set('i', i);
    }
  });

  it('should work', () => {
    const constants = new Constants();
    expect(constants).toBeDefined();
  });

  it('should have a version number', () => {
    expect(Constants.VERSION).toEqual(require('../package.json').version);
  });

  it('should correctly initialize', () => {
    const defaults = {
      autoCacheUserPosts: false,
      autoCacheLikes: false,
      cachedPostsCount: 0,
      cachedLikesCount: 0,
      cachedFollowingCount: 0,
      cachedTagsCount: 0,
      componentIds: {},
      currentUser: {},
      dashboardCache: [],
      debug: false,
      defaultKeys: true,
      eventManifest: [],
      // extensionId: EXT_ID,
      firstRun: false,
      formKey: '',
      maxLikesCount: 0,
      clientTests: false,
      saveViaFirebase: true,
      setUser: false,
      totalLikesCount: 0,
      totalPostsCount: 0,
      totalFollowingCount: 0,
      totalTagsCount: 0,
      userName: '',
      previousVersion: 0,
      likeSourceLimits: {
        untilDate: new Date(2007, 1, 1),
        untilPage: 'max'
      },
      nextLikeSourceSlug: {
        timestamp: null,
        page: null,
        url: 'https://www.tumblr.com/likes'
      },
      nextBlogSourceSlug: {
        page: 0,
        url: null
      }
    };
    const constants = new Constants(defaults);
    expect(constants.toJSON()).toEqual(defaults);
    expect(constants.get('debug')).toEqual(false);
  });

  // it ('should allow the user to listen to global initialization events from static methods', done => {
  //   Constants.once('ready', done);
  //   new Constants({ lol: 'lol' });
  // });

  it('should utilize the correct storage strategy depending on the environment', () => {
    const constants = new Constants({
      ohShit: 'whaddup'
    });
    if (Utils.isBrowser()) {
      expect(constants.getEnv()).toEqual('browser');
    } else {
      expect(constants.getEnv()).toEqual('node');
    }
  });

  it('should assign default values to the "_previous" hash', () => {
    const constants = new Constants({
      i: 0
    });
    expect(constants.previous('i')).toEqual(0);
    expect(constants.get('i')).toEqual(10);
  });

  describe('toJSON()', () => {
    it ('should correctly return undefined values', () => {
      const defaults = { breakMe: undefined };
      const constants = new Constants(defaults);
      expect(constants.get('breakMe')).toBeUndefined();
      expect(constants.toJSON()).toEqual(defaults);
    });
  });

  describe('get()', () => {
    it('should return the value indexed at the given key', () => {
      const vals = {
        billy: 'hey billy',
        oh: 'raw'
      };
      const constants = new Constants(vals);
      expect(constants.get('billy')).toEqual('hey billy');
      expect(constants.get('oh')).toEqual('raw');
      expect(constants.get({
        billy: '',
        oh: ''
      })).toEqual(vals);
    });

    it('should persist values to local storage or file system', () => {
      if (Utils.isBrowser()) {
        expect(localStorage.getItem('billy')).toEqual('hey billy');
        expect(localStorage.getItem('oh')).toEqual('raw');
      } else {
        const constants = Utils.read('./constants.json');
        expect(constants.billy).toEqual('hey billy');
        expect(constants.oh).toEqual('raw');
      }
    });

    it('should convert numbers and booleans to their corresponding types on access', () => {
      const vals = {
        undefined: undefined,
        truth: false,
        number: 10,
        null: null,
        object: {
          object: 'object'
        }
      };
      const constants = new Constants(vals);
      expect(constants.get('undefined')).toBeUndefined();
      expect(constants.get('truth')).toBe(false);
      expect(constants.get('number')).toEqual(10);
      expect(constants.get('null')).toEqual(null);
      expect(constants.get('object')).toEqual({
        object: 'object'
      });
    });

    it('should persist stored types', done => {
      if (Utils.isBrowser()) {
        expect(localStorage.getItem('undefined')).toEqual('undefined');
        expect(localStorage.getItem('null')).toEqual('`null');
        expect(localStorage.getItem('number')).toEqual('10');
        expect(localStorage.getItem('truth')).toEqual('false');
        expect(localStorage.getItem('object')).toEqual(JSON.stringify({
          object: 'object'
        }));
      }

      const vals = {
        truth: '',
        number: '',
        null: '',
        object: {}
      };

      const constants = new Constants(vals);

      setTimeout(() => {
        expect(constants.get(vals)).toEqual({
          truth: false,
          number: 10,
          null: null,
          object: {
            object: 'object'
          }
        });
        done();
      }, 0);
    });

    it('should allow new instances of "Constants" to access stored items', () => {
      const vals = {
        billy: '',
        oh: ''
      };
      const constants = new Constants(vals);
      expect(constants.get('billy')).toEqual('hey billy');
      expect(constants.get('oh')).toEqual('raw');
    });

    it('should use arguments as the response values when unassigned values are requested', () => {
      const constants = new Constants({
        top: 'kek'
      });
      expect(constants.get({
        omg: 'lol'
      })).toEqual({
        omg: 'lol'
      });
      expect(constants.get('omg')).toEqual('lol');
    });
  });

  describe('changedAttributes()', () => {
    it('should correctly update changed properties', done => {
      const constants = new Constants({
        a: 1
      });
      constants.once('change', () => {
        expect(Utils.checkProperty(constants.changedAttributes(), 'a')).toBe(true);
        done();
      });
      constants.set('a', 2);
    });

    it('should maintain the changed hash after multiple updates', done => {
      const constants = new Constants({
        a: 0
      });

      const interval = setInterval(() => {
        constants.set('a', constants.get('a') + 1);
      }, 0);

      constants.on('change', () => {
        if (constants.get('a') === 5) {
          expect(Utils.checkProperty(constants.changedAttributes(), 'a')).toBe(true);
          clearInterval(interval);
          constants.off('change');
          done();
        }
      });
    });

    it('changes hash should correctly remove old values', () => {
      const vals = {
        sombra: 'new',
        anna: 'newish',
        zarya: 'old'
      };
      const constants = new Constants(vals);
      expect(constants.changedAttributes({
        sombra: 'badass'
      })).toEqual({
        sombra: 'badass'
      });
    });
  });

  describe('defaults()', () => {
    it('should return all default values', () => {
      const vals = {
        widow: 'tracer',
        phar: 'mercy',
        torb: 'no one'
      };
      const constants = new Constants(vals);
      expect(constants.defaults()).toEqual(constants._defaults);
      expect(constants.defaults().widow).toEqual('tracer');
      expect(constants.defaults().phar).toEqual('mercy');
      expect(constants.defaults().torb).toEqual('no one');
    });
  });

  describe('default()', () => {
    it('should return the default value for the requested key', () => {
      const constants = new Constants({
        Stalin: '+',
        Mao: '+',
        Che: '+',
        Lenin: '+',
        Trotsky: '-',
        Rosa: '+'
      });
      constants.set('Mao', '++');
      expect(constants.default('Mao')).toEqual('+');
    });
  });

  describe('set()', () => {
    it('should correctly assign current values to the _previous hash', () => {
      const oldVals = {
        Castro: '+',
        Hoxta: '+',
        Sung: '+'
      };

      const newVals = {
        Castro: '++',
        Hoxta: '++',
        Sung: '+'
      };

      const constants = new Constants(oldVals);
      constants.set(newVals);
      expect(constants.previousAttributes()).toEqual(oldVals);
      expect(constants.changedAttributes()).toEqual({
        Castro: '++',
        Hoxta: '++'
      });
    });
  });

  describe('reset()', () => {
    it('should reset all values if no key is passed', () => {
      const constants = new Constants({
        chill: 'bro',
        no: 'wai'
      });
      constants.set('chill', 'dude');
      constants.set('no', 'u');
      constants.reset();
      expect(constants.get('chill')).toEqual('bro');
      expect(constants.get('no')).toEqual('wai');
    });

    it('should reset the value of the key passed', () => {
      const constants = new Constants({
        chill: 'bro',
        no: 'wai'
      });
      constants.set('chill', 'dude');
      constants.set('no', 'u');
      constants.reset('chill');
      constants.reset('no');
      expect(constants.get('chill')).toEqual('bro');
      expect(constants.get('no')).toEqual('wai');
    });

    it('should emit a reset event', () => {
      const constants = new Constants();
      spyOn(Constants.prototype, 'emit').and.callThrough();
      constants.reset();
      expect(Constants.prototype.emit).toHaveBeenCalled();
      expect(Constants.prototype.emit.calls.argsFor(0)).toEqual(['reset', constants.toJSON()]);
    });
  });

  describe('clear()', () => {
    it('should remove all managed values from local storage', () => {
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
    it('should remove the given key from storage', () => {
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
