const config = require('../config/config.json');
const { CommandMetadata, Command } = require('./commands/Command');
const CommandGroup = require('./commands/CommandGroup');
const CommandRegistry = require('./CommandRegistry');
const BotClient = require('./BotClient');

const testCommand = new Command(new CommandMetadata(
  'testCommand',
  ['1', '2', '3'],
  'do something',
  'do something cool')
);

const commandGroup = new CommandGroup('test1', 'just some tests', '!')
  .registerCommand(testCommand)
  .registerCommand(testCommand);

const commandRegistry = new CommandRegistry()
  .registerCommandGroup(commandGroup);

const bot = new BotClient('Tama', commandRegistry)
  .onLogin(() => {
    console.log('Tama at your service!');
  })
  .onMessage((message) => {
  })
  .login(config.token);
