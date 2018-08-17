const config = require('../config/config.json');

const BotClient = require('./BotClient');
const CommandRegistry = require('./commands/CommandRegistry');

const AnimeGroup = require('./commands/groups/AnimeGroup');

const commandRegistry = new CommandRegistry()
  .registerCommandGroup(
    new AnimeGroup('!', ['anime', 'a'])
  );

const bot = new BotClient('Tama', commandRegistry);

bot.onLogin(() => {
  console.log('Tama at your service!');
});

bot.login(config.token);
