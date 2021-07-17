#!/usr/bin/env node

// Import built-in libraries.
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

// Import npm packages.
const express = require("express");
const multer = require("multer");

// Import custom modules.
const filesTemplate = require("./modules/files");
const getIcon = require("./modules/getIcon");
const argv = require("./modules/argv");

// TODO: Establish some try/catch safeguards.

// Establish global constants.
const PORT = argv.options.port;
const HOST = argv.options.host;
const APP_ROOT = path.resolve(__dirname);

const FILE_DIRECTORY = argv.arguments[0] || "files";

// If the file directory does not exist, create it.
if (!fs.existsSync(FILE_DIRECTORY)) {
  fs.mkdirSync(FILE_DIRECTORY);
}

// Create a recycle bin directory.
const RECYCLE_BIN_DIRECTORY = `${FILE_DIRECTORY}/.recycle_bin`;
if (!fs.existsSync(RECYCLE_BIN_DIRECTORY)) {
  fs.mkdirSync(RECYCLE_BIN_DIRECTORY);
}

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
app.use(express.static(APP_ROOT + "/public"));

// Serve static files out of FILE_DIRECTORY at "/files".
app.use("/files", express.static(FILE_DIRECTORY));
app.get("/files/*", (req, res) => {
  // First, create an array of all the files and directories with their respective icons.
  let files = [];
  let directories = [];
  fs.readdirSync(FILE_DIRECTORY).forEach((file) => {
    if (fs.statSync(file).isDirectory()) {
      directories.push({
        name: file,
        safeName: encodeURIComponent(file),
        icon: "bi-folder"
      });
    } else {
      files.push({
        name: file,
        safeName: encodeURIComponent(file),
        icon: getIcon(file)
      });
    }
  });
  // Double-check that they're sorted.
  directories.sort((a, b) => a.name.localeCompare(b.name));
  files = files.sort((a, b) => a.name.localeCompare(b.name));
  // Take the files.html template and prefill it with the list of files.
  return res.send(filesTemplate({files: directories.concat(files)}));
});

// Create server at our specified port and protocol.
if (argv.options.tls && argv.options.key && argv.options.cert) {
  const httpsOptions = {
    key: fs.readFileSync(argv.options.key),
    cert: fs.readFileSync(argv.options.cert)
  };
  https.createServer(httpsOptions, app).listen(PORT, HOST, () => {
    console.log(`Serving "${FILE_DIRECTORY}" at https://${HOST}:${PORT}`);
  });
} else {
  http.createServer(app).listen(PORT, HOST, () => {
    console.log(`Serving "${FILE_DIRECTORY}" at http://${HOST}:${PORT}`);
  });
}
