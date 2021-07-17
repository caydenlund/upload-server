const {program} = require("commander");
program.version("0.1.0");
program
  .arguments("[folder]")
  .option("-V, --version", "Output the version number")
  .option("-p, --port <port>", "Port number", 3000)
  .option("-H, --host <host>", "Server host", "localhost")
  .option("-S, --tls", "Enable TLS/HTTPS")
  .option("-C, --cert <cert>", "Server certificate file")
  .option("-K, --key <key>", "Private key file");

program.parse(process.argv);

module.exports = {
  options: program.opts(),
  arguments: program.args
};
