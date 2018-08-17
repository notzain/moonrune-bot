const config = require('../config/config.json');
const CommandRegistry = require('./commands/CommandRegistry');
const MovienightGroup = require('./commands/groups/MovienightGroup');

const BotClient = require('./BotClient');

const AnilistRepo = require('./data/repository/anime_repo/AnilistRepo');
const anilistRepo = new AnilistRepo();

const commandRegistry = new CommandRegistry()
  .registerCommandGroup(
    new MovienightGroup('!', ['mn'])
  );

const bot = new BotClient('Tama', commandRegistry);

bot
  .onLogin(() => {
    console.log('Tama at your service!');
  })
  .onMessage((message) => {
    let content = message.content.split(' ');
    if (content[0] === '!movie') {
      content.shift();

      anilistRepo.findAnime({title: content.join(' ')})
        .then((results) => {
          console.log(typeof results);
          const filtered = results
            .filterBy('score', 80)
            .sortBy('score')
            .results;
          console.log(filtered);
        });
    }
  })
  .login(config.token);
