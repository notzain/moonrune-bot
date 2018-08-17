const CommandGroup = require('../CommandGroup');

class MovienightGroup extends CommandGroup {
  constructor(prefix, aliases) {
    super(
      'Movienight',
      `Movienight is a bi-weekly event that Avians holds, where we watch an
      (anime) movie together.`,
      prefix,
      aliases
    );
  }

  runCommand(bot, message, args) {
    const requestedCommand = args.shift();
    if (requestedCommand === 'help') {
      console.error('Send some help message');
      return;
    }

    const command = this._findCommandFuzzy(requestedCommand);
    if (command) {
      console.log(command);
    }
    console.error('Movienight is not yet implemented');
  };
};

module.exports = MovienightGroup;
