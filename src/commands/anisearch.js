const ani     = require('anifetch');
const Discord = require('discord.js');

const providers = ['kitsu', 'mal', 'myanimelist', 'anilist'];
const defaultProvider = 'anilist';

module.exports = (message, args) => {
  let customProvider = false;
  const provider = (
    () => {
      if (providers.includes(args[0])) {
        customProvider = true;
        return args[0];
      }
      return defaultProvider;
    }
  )();

  const query = (
    () => {
      if (customProvider) {
        return args.slice(1).join(' ');
      }
      return args.join(' ');
    }
  )();

  ani.search(provider, 'anime', query)
    .then((res) => {
      const anime = res[0];

      const embed = new Discord.RichEmbed()
        .setAuthor(anime.title_canonical)
        .setDescription(anime.synopsis)
        .setImage(anime.cover)
        .setURL(anime.url)
        .addField('Episodes', anime.episodes)
        .addField('Rating', anime.rating);

      message.channel.send(embed);
    })
    .catch((err) => {
      message.channel.send(`Can't find anime: '${query}'. FeelsBadMan`);
    });
};


