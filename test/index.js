import test from 'ava';
import nef from '../';

const db = nef();

test('get and set', t => {
  t.is(db.foo.get('bar'), undefined);
  db.foo.set('bar', 1);
  t.is(db.foo.get('bar'), 1);
});

test('get default value', t => {
  t.is(db.foo.get('baz', 2), 2);
});

test('has', t => {
  t.is(db.foo.has('bar'), true);
  t.is(db.foo.has('baz'), false);
});

test('keys', t => {
  t.deepEqual(db.foo.keys(), ['bar']);
  db.foo.set('baz', 49);
  t.deepEqual(db.foo.keys(), ['bar', 'baz']);
});

test('put', t => {
  db.foo.put('bar', val => val + 1);
  t.is(db.foo.get('bar'), 2);
  db.foo.put('baz', val => Math.sqrt(val));
  t.is(db.foo.get('baz'), 7);
  t.is(db.foo.get('zoo'), undefined);
  db.foo.put('zoo', val => val * 100, 10);
  t.is(db.foo.get('zoo'), 1000);
});

test('remove', t => {
  db.foo.remove('baz');
  t.is(db.foo.get('baz'), undefined);
});
