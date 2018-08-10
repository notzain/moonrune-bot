class CommandMetadata {
  constructor(name, aliases, usage, description) {
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
    console.log(`${this.meta.name} is not not implemented yet.`);
    return false;
  }
};

module.exports = {
  CommandMetadata: CommandMetadata,
  Command: Command,
};
