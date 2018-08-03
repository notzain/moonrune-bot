const imagesearch = require('g-i-s');

const findImage = (message, args, options) => {
  const query = args.join(' ');

  imagesearch(query, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }

    if (options.random) {
      message.channel.send(
        res[Math.floor(Math.random()*res.length)].url
      );
      return;
    }

    const index = (options.result && res.length > options.result)
      ? options.result
      : 0;

    message.channel.send(res[index].url);
  });
}

module.exports = (message, args) => {
  const resultNum = ( () => {
    const index = args.findIndex(el => el.includes('--result='));
    if (index === -1) {
      return null;
    }
    const num = args[index].split('=').pop();
    args.splice(index, 1);

    return parseInt(num);
  } )();

  const random = ( () => {
    const random = args.findIndex(el => el.includes('--random'));
    if (random === -1) {
      return false;
    }
    args.splice(random, 1);
    return true;
  } )();

  const options = {
    result: resultNum,
    random: random
  }

  findImage(message, args, options);
}

