module.exports = message => {
  const arrivalDate = new Date('July 31, 2018, 23:59:00');
  const diffHours = Math.round(
    Math.abs(arrivalDate - new Date()) / 3600000 );

  message.channel.send(`~${diffHours} hours till Jesse is back.`);
}

