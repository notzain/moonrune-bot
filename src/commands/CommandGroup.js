const fuzzy = require('../util/fuzzy');

class CommandGroup {
  constructor(name, description, prefix, aliases) {
    this.name = name;
    this.description = description;
    this.prefix = prefix;
    this.aliases = aliases || [];

    this.commands = [];
  };

  help() {
    const commandHelp = this.commands.forEach((command) =>
      `${command.name} (${command.aliases} - ${command.usage}
      ${command.description}`
    );

    return {
      title: this.name,
      commands: commandHelp,
    };
  }

  registerCommand(command) {
    const hasCommand = this.commands.find(
      (registeredCommand) => registeredCommand.name === command.name
    );

    if (hasCommand) {
      throw new Error(
        `Group '${this.name}' already has command ${command.meta.name}`
      );
    }

    this.commands.push(command);
    return this;
  };

  findCommandFuzzy(query) {
    return this.commands.find((command) => {
      const isPossibleCommand = fuzzy(
        query,
        command,
        'meta.aliases',
      ).length;

      if (isPossibleCommand) {
        console.log('chosen:');
        console.log(command);
        return true;
      }
      return false;
    });
  };

  runCommand(bot, message, args) {
    throw new Error('CommandGroup::runCommand is abstract');
  };
};

module.exports = CommandGroup;
