const commandHistory = require('./movienight/history');
const commandList    = require('./movienight/list');
const commandRandom  = require('./movienight/getRandomMovie');

module.exports = (message, args) => {
  switch (args[0]) {
    case 'list': {
      commandList(message, args.slice(1));
      break;
    };
    case 'random': {
      commandRandom(message, args.slice(1));
      break;
    };
    case 'history': {
      commandHistory(message, args);
      break;
    };
  }
};
