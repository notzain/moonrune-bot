const config = require('../config/config.json');
const BotClient = require('./BotClient');

const bot = new BotClient('Tama', [])
  .onLogin(() => {
    console.log('Tama at your service!');
  })
  .onMessage((message) => {
  })
  .login(config.token);
