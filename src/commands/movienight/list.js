const getMovieList = require('./getMovieLists');
const Discord   = require('discord.js');

const sortByDate = (entries) => entries.sort((a, b) => {
  return new Date(a.date) - new Date(b.date);
});

const sortByTitle = (entries) => entries.sort((a, b) => {
  return a.title.localeCompare(b.title);
});

const commandList = (message, args) => {
  getMovieList(args).then((list) => {
    list.forEach((list) => {
      let entries = list.entries;

      if (args.includes('--sort=date')) {
        sortByDate(entries);
      } else if (args.includes('--sort=title')) {
        sortByTitle(entries);
      }

      if (args.includes('--reverse')) {
        entries = entries.reverse();
      }

      const format = entries.map((entry) => {
        const score = entry.score != 0 ? `, ${entry.score}/10` : '';
        const date = entry.date ? ` (${entry.date.toDateString()})` : '';

        return `${entry.title}${score}${date}`;
      });

      const embed = new Discord.RichEmbed()
        .setAuthor(list.name)
        .setDescription(format.join('\n'));

      message.channel.send(embed);
    });
  });
};

module.exports = (message, args) => {
  commandList(message, args);
};
