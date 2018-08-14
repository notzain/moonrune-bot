const config = require('../config/config.json');
const CommandRegistry = require('./commands/CommandRegistry');
const MovienightGroup = require('./commands/groups/MovienightGroup');

const BotClient = require('./BotClient');

const commandRegistry = new CommandRegistry()
  .registerCommandGroup(
    new MovienightGroup('!', ['mn'])
  );

const bot = new BotClient('Tama', commandRegistry);

bot
  .onLogin(() => {
    console.log('Tama at your service!');
  })
  .login(config.token);
