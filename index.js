'use strict';

const nefHandler = {
  get(target, name) {
    if (!target[name]) target[name] = {};
    let object = target[name];

    const methods = {
      get(key, defaultValue) {
        const value = object[key];
        return typeof value !== 'undefined'
          ? value
          : defaultValue;
      },

      has(key) {
        return object.hasOwnProperty(key);
      },

      keys() {
        return Object.keys(object);
      },

      put(key, fn, defaultValue) {
        const value = object[key];
        object[key] = fn(typeof value !== 'undefined' ? value : defaultValue);
        target._save(name, object);
      },

      remove(key) {
        delete object[key];
        target._save(name, object);
      },

      set(key, value) {
        object[key] = value;
        target._save(name, object);
      }
    };

    return methods;
  }
};

const noop = function() {};

function nef(data) {
  if (!data) data = {_save: noop};
  return new Proxy(data, nefHandler);
}

module.exports = nef;
