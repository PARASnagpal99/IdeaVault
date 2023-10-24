const Redis = require('ioredis');
const redis = new Redis();

const cacheMiddleware = (req, res, next) => {
  const cacheKey = req.originalUrl;

  redis.get(cacheKey, (err, data) => {
    if (err) {
      console.error('Redis error:', err);
      next();
    } else if (data) {
      // Cache hit, serve cached data
       console.log('Cache hit');
      const cachedData = JSON.parse(data);
      res.json(cachedData);
    } else {
      // Cache miss, continue to the route handler
      console.log('Cache Miss')
      res.sendResponse = res.json;
      res.json = (data) => {
        redis.setex(cacheKey, 900, JSON.stringify(data)); // Set cache duration to 15 minutes
        res.sendResponse(data);
      };
      next();
    }
  });
};

module.exports = cacheMiddleware;
