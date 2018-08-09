class CommandMetadata {
  constructor(name, aliases, usage, description) {
    this.name = name;
    this.aliases = aliases;
    this.usage = usage;
    this.description = description;

    return this;
  };
};

class Command {
  constructor(metaData) {
    this.meta = commandConfig;
  };
};

module.exports = {
  CommandMetadata: CommandMetadata,
  Command: Command,
};
