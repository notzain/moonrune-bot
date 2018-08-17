class AnimeModel {
  constructor(
    {
      title,
      titleEnglish,
      description,
      cover,
      mediaFormat,
      status,
      episodes,
      studio,
      startDate,
      endDate,
      score,
      genres,
    }
  ) {
    this.title       = title;
    this.titleEnglish = titleEnglish || this.title;

    this.description = description;
    this.cover       = cover;

    this.mediaFormat = mediaFormat;
    this.status      = status;
    this.episodes    = episodes;

    this.studio      = studio;

    this.startDate   = startDate;
    this.endDate     = endDate;

    this.score       = score;

    this.genres      = genres;
  }
};

module.exports = AnimeModel;
