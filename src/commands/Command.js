class CommandMetadata {
  constructor({name, aliases, usage, description}) {
    this.name = name;
    this.aliases = aliases;
    this.usage = usage;
    this.description = description;
  };
};

class Command {
  constructor(metaData) {
    this.meta = metaData;
  };

  async run(bot, message, args) {
    throw new Error('Command::run is not implemented');
  }
};

module.exports = {
  CommandMetadata: CommandMetadata,
  Command: Command,
};
