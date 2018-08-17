const CommandGroup = require('../CommandGroup');
const FindAnimeCommand = require('../commands/anime/FindAnimeCommand');

class AnimeGroup extends CommandGroup {
  constructor(prefix, aliases) {
    super(
      'Anime',
      'Anything anime-related, such as finding any anime you (dis)like!',
      prefix,
      aliases
    );

    this.registerCommand(new FindAnimeCommand(['find', 'f']));
  }

  runCommand(bot, message, args) {
    const requestedCommand = args.shift();
    if (requestedCommand === 'help') {
      console.error('Send some help message');
      return;
    }

    const command = this._findCommandFuzzy(requestedCommand);
    if (command) {
      command.run(bot, message, args);
    } else {
      // No command found.. Assume the user wants use the find command.
      args.unshift(requestedCommand);

      const findCommand = this._findCommandFuzzy('find');
      findCommand.run(bot, message, args);
    }
  };
};

module.exports = AnimeGroup;
