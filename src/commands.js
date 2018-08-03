const commandConfig = require('../config/commands.json');

const google      = require('./commands/google');
const imagesearch = require('./commands/imagesearch');
const anisearch   = require('./commands/anisearch');
const movienight  = require('./commands/movienight');

const commandMap = [
  { command: 'anisearch',   fn: anisearch   },
  { command: 'google',      fn: google      },
  { command: 'imagesearch', fn: imagesearch },
  { command: 'movienight',  fn: movienight  },
]

module.exports = (command, message, args) => {
  for (const prop in commandConfig) {
    if (commandConfig[prop].includes(command)) {
      const cmd = commandMap.find(cmd => cmd.command === prop);
      if (cmd) {
        cmd.fn(message, args);
        return true;
      }
    }
  }
  return false;
}
