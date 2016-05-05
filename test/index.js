const test = require('tape');
const nef = require('../');

const db = nef();

test('get and set', t => {
  t.plan(3);

  t.equal(db.foo.get('bar'), undefined);
  db.foo.set('bar', 1);
  t.equal(db.foo.get('bar'), 1);
  db.powers.set('flash', 'super speed');
  t.equal(db.foo.get('bar'), 1);
});

test('get default value', t => {
  t.plan(2);

  t.equal(db.foo.get('baz', 2), 2);
  t.equal(db.powers.get('baz', 2), 2);
});

test('has', t => {
  t.plan(4);

  t.equal(db.foo.has('bar'), true);
  t.equal(db.foo.has('baz'), false);
  t.equal(db.powers.has('flash'), true);
  t.equal(db.powers.has('baz'), false);
});

test('keys', t => {
  t.plan(3);

  t.deepEqual(db.foo.keys(), ['bar']);
  db.foo.set('baz', 49);
  t.deepEqual(db.foo.keys(), ['bar', 'baz']);
  t.deepEqual(db.powers.keys(), ['flash']);
});

test('put', t => {
  t.plan(5);

  db.foo.put('bar', val => val + 1);
  t.equal(db.foo.get('bar'), 2);
  db.foo.put('baz', val => Math.sqrt(val));
  t.equal(db.foo.get('baz'), 7);
  t.equal(db.foo.get('zoo'), undefined);
  db.foo.put('zoo', val => val * 100, 10);
  t.equal(db.foo.get('zoo'), 1000);
  db.powers.put('flash', val => val + ' and tossing lightning');
  t.equal(db.powers.get('flash'), 'super speed and tossing lightning');
});

test('remove', t => {
  t.plan(2);
  db.foo.remove('baz');
  t.equal(db.foo.get('baz'), undefined);
  db.powers.remove('flash');
  t.equal(db.powers.get('flash'), undefined);
});
