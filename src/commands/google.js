const google = require('google');

module.exports = (message, args) => {
  const query = args.join(' ');
  google(query, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }

    const validLink = result.links.find((link) => link.href !== null);
    if (validLink) {
      message.channel.send(validLink.href);
    }
  });
};

