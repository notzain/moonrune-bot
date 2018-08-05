const fetch = require('node-fetch');

const query = `
query ($user: String) {
  MediaListCollection(userName: $user, type: ANIME) {
    lists {
      name,
      entries {
        media {
          title {
            romaji
          }
        },
        score,
        completedAt {
          year,
          month,
          day
        }
      }
    }
  }
}
`;
// Define our query variables and values that will be used in the query request
const variables = {
  user: 'AviansMovies',
};
// Define the config we'll need for our Api request
const url = 'https://graphql.anilist.co';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: query,
    variables: variables,
  }),
};

const getMovies = async (args) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) return null;

    const json = await response.json();
    const listToFind = json.data.MediaListCollection.lists.filter((entry) =>
      args.find((arg) => arg.toLowerCase() === entry.name.toLowerCase())
    );

    const iterableList = listToFind.length > 0
      ? listToFind
      : json.data.MediaListCollection.lists;

    return iterableList.map((list) => {
      const entries = list.entries.map((entry) => {
        const title = entry.media.title.romaji;
        const score = entry.score;

        const completed = entry.completedAt;
        const date = completed.year !== null
          ? new Date(completed.year, completed.month, completed.day)
          : null;

        return {
          title: title,
          score: score,
          date: date,
        };
      });

      return {
        name: list.name,
        entries: entries,
      };
    });
  } catch (e) {
    console.error(e);
    return null;
  }
  return null;
};

module.exports = (args) => {
  return getMovies(args);
};
