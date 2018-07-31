const ani        = require('anifetch');
const config     = require('../../config/config.json');
const Discord    = require('discord.js');

module.exports = (message, args) => {
  ani.search('anilist', 'anime', args.join(' '))
    .then(res => {
      const anime = res[0];

      const embed = new Discord.RichEmbed()
        .setAuthor(anime.title_canonical)
        .setTitle(anime.title_romaji)
        .setDescription(anime.synopsis)
        .setImage(anime.cover)
        .setURL(anime.url)
        .addField('Episodes', anime.episodes)
        .addField('Status', anime.status)
        .addField('Rating', anime.rating)

      message.channel.send(embed);
    })
    .catch(err => console.log(err));
}


