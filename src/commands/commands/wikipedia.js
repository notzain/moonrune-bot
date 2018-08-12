const wiki = require('wikijs').default;

const findArticles = async (query, results) => {
  results = results <= 0 ? 1 : results;

  try {
    const foundPages = await wiki().search(query, results);
    return foundPages;
  } catch (e) {
    console.error(e);
  }
  return [];
};

const getPage = async (query) => {
  try {
    const foundPages = await wiki().page(query);
    return foundPages;
  } catch (e) {
    console.error(e);
  }
  return null;
};

const commandFind = (message, args) => {
  const optionNumResults = (
    () => {
      const index = args.findIndex((el) => el.includes('--results='));
      if (index === -1) return 1;

      const results = args[index].split('=').pop();
      args.splice(index, 1);

      return parseInt(results);
    }
  )();
  console.log(args);
  console.log(optionNumResults);

  findArticles(args.join(' '), 5)
    .then((pages) => {
      console.log(pages.results);
    });
};

const commandWiki = (message, args) => {
  switch (args[0]) {
    case 'find': {
      commandList(message, args.slice(1));
      break;
    }
  }
};

commandWiki(0, ['find', 'batman', '--results=5']);

module.exports = (message, args) => {
  commandWiki(message, args);
};
