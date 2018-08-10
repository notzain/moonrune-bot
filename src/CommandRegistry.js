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
    const messageAsArray = message.content.trim().split(/ +/g);
    const rawCommand = messageAsArray.shift();

    this.commandGroups.forEach((commandGroup) => {
      const prefix = rawCommand.substring(0, commandGroup.prefix.length);
      const command = rawCommand.substring(commandGroup.prefix.length);

      if (commandGroup.prefix !== prefix) {
        return;
      }

      commandGroup.runCommand(bot, message, {
        commandName: command,
        commandArgs: messageAsArray,
      });
    });
  };
};

module.exports = CommandRegistry;
