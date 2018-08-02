const Discord = require('discord.js');
const fetch   = require('node-fetch');

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
  user: "AviansMovies"
};
// Define the config we'll need for our Api request
const url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

const sortByDate = (entries) => entries.sort((a, b) => {
  return new Date(a.date) - new Date(b.date);
})

const sortByTitle = (entries) => entries.sort((a, b) => {
  return a.title.localeCompare(b.title);
})


const commandList = (message, args) => {
  fetch(url, options)
    .then(response => {
      response.json().then(json => {
        if (!response.ok) return;

        const listToFind = json.data.MediaListCollection.lists.filter(entry =>
          args.find(arg => arg.toLowerCase() === entry.name.toLowerCase())
        );

        const iterableList = listToFind.length > 0
          ? listToFind
          : json.data.MediaListCollection.lists;

        const data = iterableList.map(list => {
          const entries = list.entries.map(entry => {
            const title = entry.media.title.romaji;
            const score = entry.score;

            const completed = entry.completedAt;
            const date = completed.year !== null
              ? new Date(completed.year, completed.month, completed.day)
              : null;

            return {
              title: title,
              score: score,
              date: date
            }
          })

          return {
            name: list.name,
            entries: entries
          }
        });

        data.forEach(list => {
          let entries = list.entries;

          if (args.includes('--sort=date')) {
            sortByDate(entries);
          } else if (args.includes('--sort=title')) {
            sortByTitle(entries);
          }

          if (args.includes('--reversed')) {
            entries = entries.reverse();
          }

          const format = entries.map(entry => {
            const score = entry.score != 0 ? `, ${entry.score}/10` : '';
            const date = entry.date ? ` (${entry.date.toDateString()})` : '';

            return `${entry.title}${score}${date}`;
          })

          const embed = new Discord.RichEmbed()
            .setAuthor(list.name)
            .setDescription(format.join('\n'));

          message.channel.send(embed);
        });
      })
    })
    .catch(error => {
      console.error(error);
    });
}

module.exports = (message, args) => {
  switch (args[0]) {
    case 'list': {
      commandList(message, args.slice(1));
    }
  }
}

