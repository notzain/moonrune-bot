const Fuzzy = require('fuse.js');

const makeOptions = (keys) => {
  return {
    shouldSort: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: keys,
  };
};

module.exports = (query, toMatch, keys) => {
  if (!Array.isArray(toMatch)) {
    toMatch = [toMatch];
  }
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  const fuzzy = new Fuzzy(toMatch, makeOptions(keys));
  return fuzzy.search(query);
};
