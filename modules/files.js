const fs = require("fs");

const handlebars = require("handlebars");

module.exports = handlebars.compile(fs.readFileSync("./modules/files.html").toString());