const compare = require('../../util/compare');

class AnimeResultModel {
  constructor(models) {
    this.results = models;
  }

  isEmpty() {
    return !(this.results && this.results.length > 0);
  }

  filterBy(property, value) {
    switch (property) {
      case 'startDate': {
      } break;
      case 'endDate': {
      } break;

      case 'status': {
        this.results = this.results.filter(
          (anime) => anime.status.toLowerCase() === value.toLowerCase()
        );
      } break;

      case 'episodes':
      case 'episodesHigher': {
        this.results = this.results.filter(
          (anime) => anime.episodes > parseInt(value)
        );
      } break;
      case 'episodesLower': {
        this.results = this.results.filter(
          (anime) => anime.episodes < parseInt(value)
        );
      } break;

      case 'score':
      case 'scoreHigher': {
        this.results = this.results.filter(
          (anime) => anime.score > parseInt(value)
        );
      } break;
      case 'scoreLower': {
        this.results = this.results.filter(
          (anime) => anime.score < parseInt(value)
        );
      } break;
    }

    return this;
  }

  sortBy(property, ascending = true) {
    switch (property) {
      case 'name':
      case 'title': {
        this.results.sort(
          (a, b) => compare.byString(a.title, b.title)
        );
      } break;

      case 'startDate': {
        this.results.sort(
          (a, b) => compare.byDate(a.startDate, b.startDate)
        );
      } break;
      case 'endDate': {
        this.results.sort(
          (a, b) => compare.byDate(a.endDate, b.endDate)
        );
      } break;

      case 'episodes': {
        this.results.sort(
          (a, b) => compare.byNum(a.episodes, b.episodes)
        );
      } break;

      case 'score': {
        this.results.sort(
          (a, b) => compare.byNum(a.score, b.score)
        );
      } break;
    }

    if (!ascending) this.results.reverse();
    return this;
  }
};

module.exports = AnimeResultModel;
