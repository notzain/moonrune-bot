const {CommandMetadata, Command} = require('../../Command');
const AnilistRepo = require('../../../data/repository/anime_repo/AnilistRepo');
const AnimeEmbed = require('../../embeds/AnimeEmbed');
const AnimeCompactEmbed = require('../../embeds/AnimeCompactEmbed');

const param = require('../../../util/param');

class FindAnimeCommand extends Command {
  constructor(aliases) {
    super(new CommandMetadata({
      name: 'find',
      aliases: aliases,
      usage: 'find <query> (--filterBy=<property, value> --sortBy=<property>)',
      description: 'Finds anime using [Anilist], and optionally filter and sort',
    }));
  }

  async run(bot, message, args) {
    const filterValue = param.extractWithValue('--filter', args);
    const sortValue = param.extractWithValue('--sort', args);
    const isCompact = param.extract('--compact', args);
    const showAll = param.extract('--all', args);

    const animeQuery = args.join(' ');

    const repo = new AnilistRepo();
    const resultModel = await repo.findAnime({title: animeQuery});

    if (resultModel.isEmpty()) {
      message.channel.send(`No anime '${animeQuery}' found. FeelsBadMan`);
      return;
    }

    if (filterValue) {
      const [prop, val] = filterValue.split(',');
      resultModel.filterBy(prop, val);
    }
    if (sortValue) {
      resultModel.sortBy(sortValue);
    }

    if (showAll) {
      const formattedResult = resultModel.results.map((anime) => anime.title);
      message.channel.send(formattedResult.join('\n'));
    } else {
      const embed = isCompact
        ? new AnimeCompactEmbed(resultModel.results[0])
        : new AnimeEmbed(resultModel.results[0]);

      message.channel.send(embed.make());
    }
  }
}

module.exports = FindAnimeCommand;
