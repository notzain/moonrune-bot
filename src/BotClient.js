const DiscordJS = require('discord.js');

class BotClient {
  constructor(botName, commandRegistry) {
    this.botName = botName;
    this.commandRegistry = commandRegistry;
    this.client = new DiscordJS.Client();
    this.serverWhitelist = [];

    this.onMessageCallback = null;
    this.onLoginCallback = null;

    this._setup();
  };

  _registerOnMessage() {
    this.client.on('message', (message) => {
      if (message.author.bot) {
        return;
      }

      if (this.checkRegisterCommands(message)) {
        return;
      }

      if (this.isRegisteredServer(message.guild.id)) {
        this.commandRegistry.run(this, message);
      };

      if (this.onMessageCallback) this.onMessageCallback();
    });
  }

  _registerOnLogin() {
    this.client.on('ready', () => {
      if (this.onLoginCallback) this.onLoginCallback();
    });
  }

  _setup() {
    this._registerOnMessage();
    this._registerOnLogin();
  }

  registerServer(serverId) {
    const serverIndex = this.serverWhitelist.indexOf(serverId);
    if (serverIndex === -1) {
      this.serverWhitelist.push(serverId);
      return true;
    }
    return false;
  };

  unregisterServer(serverId) {
    const serverIndex = this.serverWhitelist.indexOf(serverId);
    if (serverIndex === -1) {
      return false;
    }

    this.serverWhitelist.splice(serverIndex, 1);
    return true;
  }

  isRegisteredServer(serverId) {
    return this.serverWhitelist.includes(serverId);
  };

  checkRegisterCommands(message) {
    const botId = this.client.user.id;

    if (!message.mentions.users.has(botId)) {
      return false;
    }

    const serverId = message.guild.id;
    const messageArray = message.content.trim().split(' ');

    if (messageArray.includes('register')) {
      if (this.registerServer(serverId)) {
        message.channel.send(
          'At your service, Gintoki-sama.'
        );
        return true;
      }
    } else if (messageArray.includes('unregister')) {
      if (this.unregisterServer(serverId)) {
        message.channel.send(
          'Please call me back when you need my services.'
        );
        return false;
      }
    }
  };

  onLogin(callback) {
    this.onLoginCallback = callback;
    return this;
  };

  onMessage(callback) {
    this.onMessageCallback = callback;
    return this;
  }

  login(token) {
    this.client.login(token);
  };
};

module.exports = BotClient;
