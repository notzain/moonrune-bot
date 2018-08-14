const AnimeRepo = require('../AnimeRepo');
const AnimeModel = require('../../models/AnimeModel');
const AnilistDatasource = require('../../datasource/AnilistDatasource');

class AnilistRepo extends AnimeRepo {
  constructor() {
    super();

    this.results = [];
  }

  async findAnime(property) {
    const results = await AnilistDatasource.findAnime(property);

    this.results = results.map((result) => {
      return new AnimeModel({
        title: result.title.romaji,
        titleRomaji: result.title.romaji,
        description: result.description,
        cover: result.coverImage.large,
        mediaFormat: result.format,
        status: result.status,
        episodes: result.episodes,
        studio: [],
        startDate: new Date(
          result.startDate.year,
          result.startDate.month,
          result.startDate.day
        ),
        endDate: new Date(
          result.endDate.year,
          result.endDate.month,
          result.endDate.day
        ),
        score: result.averageScore,
        genres: result.genres,
      });
    });

    return this;
  }

  filterBy() {

  }
};

module.exports = AnilistRepo;
