const ani        = require('anifetch');
const config     = require('../../config/config.json');
const Discord    = require('discord.js');

const providers = ['kitsu', 'mal', 'myanimelist', 'anilist'];

module.exports = (message, args) => {
  let provider = 'anilist';
  let query = args.slice();

  if (providers.includes(args[0])) {
    provider = args[0];
    query = args.slice(1);
  }

  query = query.join(' ');
  ani.search(provider, 'anime', query)
    .then(res => {
      const anime = res[0];

      const embed =  new Discord.RichEmbed()
        .setAuthor(anime.title_canonical)
        .setDescription(anime.synopsis)
        .setImage(anime.cover)
        .setURL(anime.url)
        .addField('Episodes', anime.episodes)
        .addField('Rating', anime.rating)

      message.channel.send(embed);
    })
    .catch(err => {
      message.channel.send(`Can't find anime: '${query}'. FeelsBadMan`);
    })
}


