# nef

[![build status](https://img.shields.io/travis/CreaturePhil/nef/master.svg?style=flat-square)](https://travis-ci.org/CreaturePhil/nef)
[![devDependency Status](https://david-dm.org/CreaturePhil/nef/dev-status.svg?style=flat-square)](https://david-dm.org/CreaturePhil/nef#info=devDependencies)


Proxy-based database

## Install

```
npm install nef --save
```

## Usage

```js
const db = require('nef')({_save: function() {}});
db.money.set('phil', 100);
console.log(db.money.get('phil')); // 100
```

## Docs

### nef(data)

Creates a nef in-memory database. `data` requires `_save` function key property.
Each key of the database can be referred to as a collection and it returns
methods.

```js
const nef = require('nef');
const noop = function() {};
const db = nef({_save: noop});
```

### get(key, defaultValue)

Get a key. Use a default value of the key does not exist.

```js
// database
{
  powers: {
    flash: 'super speed'
  },
  money: {
    john: 3,
    phil: 10
  }
}

db.powers.get('flash'); // super speed
db.powers.get('laser dude', 'laser vision'); // laser vision
db.money.get('john'); // 3
```

### has(key)

Returns a boolean on whether or not a key exists.

```js
db.posts.has(74); // false
db.posts.has(1); // true
```

### keys()

Returns an array of the object's properties.

```js
db.users.keys(); // ['phil', 'mike', 'dan']
```

### put(key, fn)

Applies a function to the key value and saves it.

```js
db.money.put('james', (val) => val + 2);
```

### remove(key)

Delete a key from the object.

```js
db.users.remove('smitty');
```

### set(key, value)

Set a key to a value.

```js
db.ranks.set('user1', 1282);
db.ranks.set('user2', 1984);
db.tickets.set('user1', [1,2,3]);
db.tickets.set('user2', [7,5,2]);

// in database:
{
  ranks: {
    user1: 1282,
    user2: 1984
  },
  tickets: {
    user1: [1,2,3],
    user2: [7,5,2]
  }
}
```

## LICENSE

[MIT](LICENSE)
