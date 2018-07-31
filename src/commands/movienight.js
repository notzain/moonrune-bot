const usage = `usage: movienight [command] [...args] \n
              list [ default = all, seen, unseen ] \n
              add  [ movie ] \n
              del  [ movie ] \n
              finished [ movie ] \n
              `

module.exports = (message, args) => {
  if (args == 0) {
    message.channel.send(usage);
  }
}

