# ConstantFox

Utility for TumblrFox that synchronously accesses stored values using the chrome extension storage api. Emits change, initialization, and reset events. Automatically detects JS environment and adapts storage strategy.

Functions very similarly to a Backbone model.

# Example

```   
const constants = new Constants({
  dat: 'boi',
  ohShit: 'whaddup'
});

constants.get('dat') // return 'boi'
constants.get('ohShit') // returns 'whaddup'

constants.get({ dat: '', ohShit: '' }) // returns { dat: 'boi', ohShit: 'whaddup' }

```
# Another example

```
const constants = new Constants();

for (let i = 0; i < 10; i += 1) {
  constants.set('i', i);
}

// a few hours later...

const constants = new Constants({
  i: 0
});

constants.get('i') // returns 10
constants.previous('i') // returns 0
```

[![Dependency Status](https://david-dm.org/idelairre/tumblelog-generator.svg)](https://david-dm.org/idelairre/ConstantFox)
[![devDependency Status](https://david-dm.org/idelairre/tumblelog-generator/dev-status.svg)](https://david-dm.org/idelairre/ConstantFox#info=devDependencies)
