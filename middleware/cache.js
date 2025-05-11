const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

exports.cacheMiddleware = (keyPrefix) => {
  return (req, res, next) => {
    const key = `${keyPrefix}_${req.params.id || 'all'}`;
    const cachedData = cache.get(key);

    if (cachedData) {
      console.log('Serving from cache');
      return res.json(cachedData);
    }

    // Override res.json to cache responses
    const originalJson = res.json;
    res.json = (body) => {
      cache.set(key, body);
      originalJson.call(res, body);
    };

    next();
  };
};