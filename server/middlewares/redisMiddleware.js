const Redis = require('ioredis');
const redis = new Redis();

// Middleware to cache responses in Redis for 10 minutes
const cacheMiddleware = (req, res, next) => {
  const cacheKey = req.originalUrl;

  redis.get(cacheKey, (err, data) => {
    if (err) {
      console.error('Redis error:', err);
      next();
    } else if (data) {
      // Cache hit, serve cached data
      const cachedData = JSON.parse(data);
      res.json(cachedData);
    } else {
      // Cache miss, continue to the route handler
      res.sendResponse = res.json;
      res.json = (data) => {
        redis.setex(cacheKey, 10, JSON.stringify(data)); // Cache for 10 seconds 
        res.sendResponse(data);
      };
      next();
    }
  });
};

module.exports = cacheMiddleware;
