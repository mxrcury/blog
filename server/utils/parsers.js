const camelToSnakeCaseParser = (text) => {
  const parsedText =  text.split("").map((t) => {
    if (isUpperCase(t)) {
      return `_${t.toLowerCase()}`;
    }
    return t;
  }).join('')
  return parsedText
};

const isUpperCase = (text) => {
  return text.toUpperCase() === text;
};

module.exports = { camelToSnakeCaseParser };
