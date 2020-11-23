const express = require('express');
const logger = require('../logger');
const UsersController = require('../controllers/users');

const router = express.Router({ mergeParams: true });

router.post('/', UsersController.create)
router.delete('/:userId', UsersController.remove)
// events fallback error handler
router.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Unable to proceed Users request');
});

module.exports = router;
