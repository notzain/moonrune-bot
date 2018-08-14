const {CommandMetadata, Command} = require('../Command');
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

    for (let i = 0; i < 5; ++i) {
      this.registerCommand(new Command(
        new CommandMetadata(
          `cm${i}`,
          [`cm${i}`],
          `cm${i}`,
          `cm${i}`
        )
      ));
    }
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
