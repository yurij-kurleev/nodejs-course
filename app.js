require('dotenv').config()
const http = require('http');
const express = require('express');
const { PORT } = require('./config');
const logger = require('./logger');
const eventsRouter = require('./routers/events');
const usersRouter = require('./routers/users');

const app = express();

app.use(express.json())

app.use('/events', eventsRouter);
app.use('/users', usersRouter);

app.all('*', (req, res) => {
  res.status(200).send('Welcome to the NodeJS course API!');
});
// fallback error handler
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Something went wrong...');
});

http.createServer(app).listen(PORT, () => logger.log(`Listening on port ${PORT}...`));
