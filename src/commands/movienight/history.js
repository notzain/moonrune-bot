const fetch = require('node-fetch');

const query = `
query ($user: String) {
  User(name: $user) {
    about
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
  body: JSON.stringify(
    {
      query: query,
      variables: variables,
    }
  ),
};

const commandHistory = (message, args) => {
  fetch(url, options)
    .then((response) => response.json().then((json) => {
      if (!response.ok) return;

      message.channel.sendCode('javascript', json.data.User.about);
    }))
    .catch((error) => {
      console.error(error);
    });
};

module.exports = (message, args) => {
  commandHistory(message, args);
};
