const commandList    = require('./movienight/list');
const commandHistory = require('./movienight/history');

module.exports = (message, args) => {
  switch (args[0]) {
    case 'list': {
      commandList(message, args.slice(1));
      break;
    }
    case 'history': {
      commandHistory(message, args);
      break;
    }
  }
}

