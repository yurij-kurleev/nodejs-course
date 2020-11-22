const express = require('express');
const logger = require('../logger');
const EventsController = require('./controller');

const router = express.Router({ mergeParams: true });

router.get('/', EventsController.show)
router.get('/events-batch', EventsController.batchShow)
router.get('/:eventId', EventsController.showOne)
router.post('/', EventsController.create)
router.put('/:eventId', EventsController.update)
router.delete('/:eventId', EventsController.remove)
// events fallback error handler
router.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Unable to proceed Events request');
});

module.exports = router;
