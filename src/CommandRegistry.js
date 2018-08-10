class CommandRegistry {
  constructor() {
    this.commandGroups = [];
  };

  registerCommandGroup(commandGroup) {
    const hasGroup = this.commandGroups.find((group) => {
      return group.name === commandGroup.name;
    });

    if (hasGroup) {
      throw new Error(
        `Cannot register same group twice. (${commandGroup.name})`
      );
    }

    this.commandGroups.push(commandGroup);

    return this;
  };

  registerCommand(commandGroup, command) {
    const groupName = commandGroup.name || commandGroup;
    const groupIndex = this.commandGroups.findIndex((group) => {
      return groupName === group.name;
    });

    if (groupIndex === -1) {
      throw new Error(`Group ${groupName} does not exist.`);
    }

    this.commandGroups[groupIndex].registerCommand(command);

    return this;
  };

  async run(bot, message) {
    const prefix = message.content[0];
    this.commandGroups.forEach((commandGroup) => {
      if (commandGroup.prefix === prefix) {
        commandGroup.runCommand(bot, message, message);
      }
    });
  }
};

module.exports = CommandRegistry;
