const {program} = require("commander");
program.version("0.1.0");
program
  .option("-V, --version", "Output the version number")
  .option("-p, --port <port>", "Port number", 3000)
  .option("-H, --host <host>", "Server host", "localhost")
  .option("-f, --folder <folder>", "Folder to upload files", "files")
  .option("-S, --tls", "Enable TLS/HTTPS")
  .option("-C, --cert <cert>", "Server certificate file")
  .option("-K, --key <key>", "Private key file");

module.exports = program.parse(process.argv).opts();
