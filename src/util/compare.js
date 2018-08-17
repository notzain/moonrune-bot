const byDate = (a, b) => new Date(a) - new Date(b);
const byNum = (a, b) => a - b;

module.exports = {
  byDate,
  byNum,
};
