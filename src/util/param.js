module.exports = {
  extract: (property, parameters) => {
    const index = parameters.findIndex((el) => el.includes(property));
    if (index === -1) {
      return false;
    }

    parameters.splice(index, 1);
    return true;
  },

  extractWithValue: (property, parameters) => {
    const index = parameters.findIndex((el) => el.includes(property));
    if (index === -1) {
      return null;
    }
    const propValue = parameters[index].split('=').pop();
    parameters.splice(index, 1);

    return propValue;
  },

};
