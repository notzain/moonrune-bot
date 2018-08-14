const fetch = require('node-fetch');

const makeAnimeQuery = (properties) => {
  const requestedResults = properties.results || 10;

  return `
  query($title: String) {
    Page(page: 1, perPage: ${requestedResults}) {
      media(search: $title, type: ANIME) {
        title {
          romaji
          english
        },
        startDate {
          year
          month
          day
        },
        endDate {
          year
          month
          day
        },
        coverImage {
          large
        },
        description,
        format,
        status,
        episodes,
        genres,
        averageScore,
      }
    }
  }
  `
};

const AnilistDatasource = {
  async findAnime(properties) {
    const url = 'https://graphql.anilist.co';

    const variables = {
      title: properties.title,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: makeAnimeQuery(properties),
        variables: variables,
      }),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        console.error(response);
        return [];
      }

      const json = await response.json();

      return json.data.Page.media;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

module.exports = AnilistDatasource;
