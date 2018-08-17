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
      (registeredCommand) => {
        return registeredCommand.meta.name === command.meta.name;
      }
    );
    if (hasCommand) {
      throw new Error(
        `Group '${this.name}' already has command ${command.meta.name}`
      );
    }

    this.commands.push(command);
    return this;
  };

  _findCommandFuzzy(query) {
    return this.commands.find((command) => {
      const isPossibleCommand = fuzzy(
        query,
        command,
        'meta.aliases',
      ).length;

      return isPossibleCommand;
    });
  };

  runCommand(bot, message, args) {
    throw new Error('CommandGroup::runCommand is not implemented.');
  };
};

module.exports = CommandGroup;
