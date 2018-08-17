const Embed = require('./Embed');
const Discord = require('discord.js');

class AnimeEmbed extends Embed {
  constructor(animeModel) {
    super();
    this.model = animeModel;
  }

  make() {
    const embed = new Discord.RichEmbed()
      .setAuthor(this.model.title)
      .setTitle(this.model.titleEnglish)
      .setDescription(this.model.description)

      .setThumbnail(this.model.cover)
      .setImage(this.model.cover)

      .addField('Media', this.model.mediaFormat)
      .addField('Status', this.model.status)
      .addField('Episodes', this.model.episodes)
      .addField('Aired',
        `${this.model.startDate.toDateString()} - ${this.model.endDate.toDateString()}`
      )
      .addField('Score', this.model.score);

    if (this.model.genres && this.model.genres.length > 0) {
      embed.addField('Genres', this.model.genres.join(', '));
    }

    if (this.model.studio && this.model.studio.length > 0) {
      embed.addField('Studio', this.model.studio.join(', '));
    }

    return embed;
  }
}

module.exports = AnimeEmbed;
