const { CommandMetadata, Command } = require('../../Command');

class MovienightCommand extends Command {
  constructor(aliases) {
    const metaData = new CommandMetadata(
      'movienight',
      aliases,
      'movienight [list, sort]',
      'Movienight shows you everything related to our bi-weekly anime movienights.'
    );
    super(metaData);
  };

  async run(bot, message, args) {
    console.log('list');
  };
};

module.exports = MovienightCommand;
