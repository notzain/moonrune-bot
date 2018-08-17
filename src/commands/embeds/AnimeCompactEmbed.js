const Embed = require('./Embed');
const Discord = require('discord.js');

class AnimeCompactEmbed extends Embed {
  constructor(animeModel) {
    super();
    this.model = animeModel;
  }

  make() {
    const embed = new Discord.RichEmbed()
      .setAuthor(this.model.title)

      .setThumbnail(this.model.cover)

      .addField('Status', this.model.status)
      .addField('Episodes', this.model.episodes)
      .addField('Aired',
        `${this.model.startDate.toDateString()} - ${this.model.endDate.toDateString()}`
      )
      .addField('Score', this.model.score);

    return embed;
  }
}

module.exports = AnimeCompactEmbed;
