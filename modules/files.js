const path = require("path");
const fs = require("fs");

const handlebars = require("handlebars");

module.exports = handlebars.compile(
  fs.readFileSync(path.resolve(__dirname) + "/files.html").toString()
);
