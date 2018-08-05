module.exports = (message, args) => {
  if (args.length === 0) {
    message.channel.send('Heads or tails?');
    return 0;
  }

  const answer = args[0];
  if (answer === 'heads' || answer === 'tails') {
    const flip = (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
    message.channel.send(`Coin landed ${flip}`);

    return flip === answer ? 5 : -5;
  } else {
    message.channel.send('Heads or tails?');
    return 0;
  }
};
