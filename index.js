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

      put(key, fn) {
        object[key] = fn(object[key]);
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

function nef(data) {
  return new Proxy(data, nefHandler);
}

module.exports = nef;
