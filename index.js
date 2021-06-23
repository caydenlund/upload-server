#!/usr/bin/env node
// Import built-in libraries.
const http = require("http");
const https = require("https");
const fs = require("fs");

// Import npm packages.
const express = require("express");
const multer = require("multer");

// Import custom modules.
const filesTemplate = require("./modules/files");
const getIcon = require("./modules/getIcon");
const argv = require("./modules/argv");

// TODO: Establish some try/catch safeguards.

// Establish global constants.
const PORT = argv.port;
const HOST = argv.host;
const FILE_DIRECTORY = argv.folder;

// Create Express server.
const app = express();

// Establish Multer middleware.
const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, FILE_DIRECTORY);
  },
  filename: (req, file, next) => {
    next(null, file.originalname);
  }
});
const upload = new multer({storage});

// Upload files at "/upload".
app.post("/upload", upload.array("files"), (req, res, next) => {
  res.redirect("/");
  res.end();
});

// Serve static files out of "public" at "/".
app.use(express.static("public"));

// Serve static files out of FILE_DIRECTORY at "/files".
app.use("/files", express.static(FILE_DIRECTORY));
app.get("/files", (req, res) => {
  // First, create an array of all the files with their respective icons.
  let files = [];
  fs.readdirSync(FILE_DIRECTORY).forEach((file) => {
    files.push({
      name: file,
      safeName: encodeURIComponent(file),
      icon: getIcon(file)
    });
  });
  // Double-check that they're sorted.
  files = files.sort((a, b) => a.name.localeCompare(b.name));
  // Take the files.html template and prefill it with the list of files.
  return res.send(filesTemplate({files}));
});

// Create server at our specified port and protocol.
console.log(argv);
if (argv.tls && argv.key && argv.cert) {
  const httpsOptions = {
    key: fs.readFileSync(argv.key),
    cert: fs.readFileSync(argv.cert)
  };
  https.createServer(options, app).listen(PORT, HOST, () => {
    console.log(`Server started on https://${HOST}:${PORT}`);
  });
} else {
  http.createServer(app).listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
  });
}
