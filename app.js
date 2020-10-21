const { PORT, ENV } = require('./config');
const logger = require('./logger');
const http = require('http');

http.createServer((req, res) => {
  logger.log('Hello world!');
  res.end();
}).listen(PORT, () => logger.log(`Listening on port ${PORT}...`));