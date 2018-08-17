const byDate = (a, b) => new Date(a) - new Date(b);
const byNum = (a, b) => a - b;
const byString = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

module.exports = {
  byDate,
  byNum,
  byString,
};
