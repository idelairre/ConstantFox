# ConstantsFox

Utility for TumblrFox that synchronously accesses stored values using the chrome extension storage api. Emits change, initialization, and reset events. Automatically detects JS environment and adapts storage strategy.

Functions very similarly to a Backbone model.

# Examples

```   
const constants = new Constants({
  dat: 'boi',
  ohShit: 'whaddup'
});

constants.get('dat') // return 'boi'
constants.get('ohShit') // returns 'whaddup'

constants.get({ dat: '', ohShit: '' }) // returns { dat: 'boi', ohShit: 'whaddup' }
constants.get({ dat: '', ohShit: '', isTheWorst: 'meme' }) returns { dat: 'boi', ohShit: 'whaddup', isTheWorst: 'meme' }
constants.get('isTheWorst') // returns 'meme';

```


```
const constants = new Constants();

for (let i = 0; i < 11; i += 1) {
  constants.set('i', i);
}

constants.previous(i); // returns 9

// a few hours later...

const constants = new Constants({
  i: 0
});

constants.get('i') // returns 10
constants.previous('i') // returns 0
```

ConstantsFox is meant to be as simple as possible. It is legal (for now) to directly access stored members. Just don't write to them unless you want things to get funky.

```
const constants = new Constants({
  wut: 'i dunno'
});

constants.wut // return 'i dunno'
```

[![Dependency Status](https://david-dm.org/idelairre/tumblelog-generator.svg)](https://david-dm.org/idelairre/ConstantFox)
[![devDependency Status](https://david-dm.org/idelairre/tumblelog-generator/dev-status.svg)](https://david-dm.org/idelairre/ConstantFox#info=devDependencies)
