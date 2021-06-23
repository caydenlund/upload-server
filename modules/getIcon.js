const patterns = [
  {
    name: "bi-file-earmark-image",
    pattern: new RegExp(".(png|jpe?g|gif|bmp)$")
  },
  {
    name: "bi-file-earmark-code",
    pattern: new RegExp(".(m?jsx?|ts|html?|css|s[ac]ss|less|md|json)")
  }
];

//TODO: Build more complete DB.

module.exports = (name) => {
  let patternName;
  patterns.forEach((pattern) => {
    if (pattern.pattern.test(name)) patternName = pattern.name;
  });
  return patternName || "bi-file-earmark";
};
