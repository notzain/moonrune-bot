class CommandGroup {
  constructor(name, description, prefix) {
    this.name = name;
    this.description = description;
    this.prefix = prefix;
    this.commands = [];
  };

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

  runCommand(bot, message, args) {
    return this.commands.some((command) => {
      if (command.meta.aliases.includes(args.commandName)) {
        return command.run(bot, message, args.commandArgs);
      }
      return false;
    });
  };
};

module.exports = CommandGroup;
