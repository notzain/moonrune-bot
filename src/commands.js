const commandConfig = require('../config/commands.json');

const jesse   = require('./commands/jesse');
const google  = require('./commands/google')
const anilist = require('./commands/anilist')

const commandMap = [
  { command: 'jesse', fn: jesse },
  { command: 'google', fn: google },
  { command: 'anilist', fn: anilist },
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
