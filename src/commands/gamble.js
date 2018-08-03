const AsciiTable = require('ascii-table');
const Coinflip   = require('./gamble/coinflip');
const JsonDB     = require('node-json-db');

const db = new JsonDB (
  'config/casino.json', // File location
  true, // Autosave
  true // Human readable
);

const getOrCreateUser = user => {
  const data = db.getData('/users');

  const userToFind = data.find(entry => entry.id === user.id);
  if (userToFind) {
    const indexOf = data.indexOf(userToFind);
    return {
      id: userToFind.id,
      username: user.username,
      shinies: userToFind.shinies,
      index: indexOf
    };
  }
  db.push('/users[]', {
    id: user.id,
    username: user.username,
    shinies: 0
  });

  return {
    id: user.id,
    username: user.username,
    shinies: 0,
    index: data.length - 1
  }
}

const updateShinies = user => {
  db.push(`/users[${user.index}]`, {
    id: user.id,
    username: user.username,
    shinies: user.shinies
  })
}

module.exports = (message, args) => {
  const user = getOrCreateUser({
    id: message.author.id,
    username: message.author.username
  });

  switch (args[0]) {
    case 'coinflip': {
      const amount = Coinflip(message, args.slice(1));
      if (amount === 0) return;

      user.shinies += amount;
      const msg =
        (amount > 0
        ? `${user.username} won ${amount} shinies!`
        : `${user.username} lost ${Math.abs(amount)} shinies!`)
        + `\n${user.username} now has ${user.shinies} shinies left.`;

      message.channel.send(msg);
      updateShinies(user);

      break;
    }
    case 'stats': {
      let table = new AsciiTable()
        .setHeading('User', 'Shinies');

      const users = db.getData('/users');
      users.forEach(user => {
        table.addRow(user.username, user.shinies);
      })

      message.channel.send(`\n\n ${table.toString()}`);
      break;
    }
  }
}

