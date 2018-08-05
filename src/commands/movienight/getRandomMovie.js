const getMovieList = require('./getMovieLists');
const Discord      = require('discord.js');

const getRandomMovie = (message, args) => {
  getMovieList(args).then((lists) => {
    lists.forEach((list) => {
      const entries = list.entries;
      const randomMovie = entries[Math.floor(Math.random() * entries.length)];

      message.channel.send(`${list.name}: ${randomMovie.title}`);
    });
  });
};

module.exports = (message, args) => {
  getRandomMovie(message, args);
};
