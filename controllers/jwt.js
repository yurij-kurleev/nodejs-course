const jwt = require('jsonwebtoken');

// in-memory whitelist of all active tokens
/*
* userId
* accessToken
* refreshToken
* */
let tokenStore = [];

const JWTController = {
  login: async (req, res, next) => {
    const { body: { userId } } = req;
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '10s' });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30s' });
    tokenStore.push({
      userId,
      accessToken,
      refreshToken,
    })
    return res.json({ accessToken, refreshToken });
  },
  refresh: async (req, res, next) => {
    const token = req.get('authorization');
    try {
      const { userId } = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      // check if refreshToken in whitelist
      if (!tokenStore.find(({ refreshToken }) => refreshToken === token)) {
        return res.status(401).send('Token was revoked');
      }
      // removing token from the store so that it's no longer in a whitelist
      tokenStore = tokenStore.filter(({ refreshToken }) => refreshToken !== token);
      // creating a new pair
      const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '10s' });
      const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30s' });
      // whitelist
      tokenStore.push({
        userId,
        accessToken,
        refreshToken,
      })
      return res.json({ accessToken, refreshToken });
    } catch (err) {
      return res.status(401).end();
    }
  },
  check: async (req, res, next) => {
    const token = req.get('authorization');
    try {
      jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      // check if accessToken in whitelist
      if (!tokenStore.find(({ accessToken }) => accessToken === token)) {
        return res.status(401).send('Token was revoked');
      }
      return res.send('Verified');
    } catch (err) {
      return res.status(401).end();
    }
  },
};

module.exports = JWTController;
