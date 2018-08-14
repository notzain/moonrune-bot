class AnimeRepo {
  async findAnime(property) {
    throw new Error('AnimeRepo::findAnime not implemented.');
  }
  filterBy(property, value) {
    throw new Error('AnimeRepo::filterBy not implemented.');
  }
};

module.exports = AnimeRepo;
