const express = require('express');
const logger = require('../logger');
const JWTController = require('../controllers/jwt');

const router = express.Router({ mergeParams: true });

router.post('/login', JWTController.login)
router.post('/refresh_tokens', JWTController.refresh)
router.post('/check_access', JWTController.check)
// events fallback error handler
router.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Unable to proceed JWT request');
});

module.exports = router;
