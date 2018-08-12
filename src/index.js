const config = require('../config/config.json');
const CommandRegistry = require('./commands/CommandRegistry');
const MovienightGroup = require('./commands/groups/MovienightGroup');

const BotClient = require('./BotClient');

const commandRegistry = new CommandRegistry()
  .registerCommandGroup(
    new MovienightGroup('!', ['mn'])
  );

const bot = new BotClient('Tama', commandRegistry)
  .onLogin(() => {
    console.log('Tama at your service!');
  })
  .onMessage((message) => {
    /*
    console.log('Commands:');
    commandRegistry.commandGroups.forEach((group) => {
      group.commands.forEach((command) => console.log(command));
    });
    */
  })
  .login(config.token);
