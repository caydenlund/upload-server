#!/usr/bin/env node
// Import built-in libraries.
const http = require("http");

// Import npm libraries.
const express = require("express");
const serveIndex = require("serve-index");
const multer = require("multer");

// Establish defaults.
const DEFAULT_PORT = 3000;
const DEFAULT_FILE_DIRECTORY = "files";

// Establish global constants.
const PORT = 3000;
const FILE_DIRECTORY = "files";

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
app.use("/files", express.static(FILE_DIRECTORY), serveIndex(FILE_DIRECTORY, {icons: true}));

// Create HTTP server at our specified port.
http.createServer(app).listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
