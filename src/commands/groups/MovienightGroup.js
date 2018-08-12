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
    console.error('Movienight is not yet implemented');
  };
};

module.exports = MovienightGroup;
