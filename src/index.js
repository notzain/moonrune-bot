const Discord       = require('discord.js');
const config        = require('../config/config.json');
const handleCommand = require('./commands.js')

const client = new Discord.Client({disableEveryone: true});

const sadEmotes = [
  'IchigoCry',
  'ChitogeCry',
  'KonataCry',
  'illyacry',
  'TheSaddest',
  'kuropatsad',
]

client.on('ready', async () => {
  console.log(client.user.username);
});

client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!handleCommand(command, message, args)) {
    const emoteToFind = sadEmotes[Math.floor(Math.random() * sadEmotes.length)];
    const emote = client.emojis.find('name', emoteToFind) || '';

    message.channel.send(`I don't recognize command '${command}'${emote}.`);
  }
});

client.login(config.token);
