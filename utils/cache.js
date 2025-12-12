import NodeCache from "node-cache";
import logger from "./logger.js";

const userCache = new NodeCache({ stdTTL: 1800, checkperiod: 300 }); // 30 min
const planCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 }); // 1 hour
const usageCache = new NodeCache({ stdTTL: 300, checkperiod: 60 }); // 5 minutes

const cacheMap = {
  user: userCache,
  plan: planCache,
  usage: usageCache,
};

export const withCache = async (entity, key, fetchFn) => {
  const cache = cacheMap[entity];
  if (!cache) {
    logger.warn(`Cache inexistent pentru entitatea: ${entity}`);
    return fetchFn();
  }

  const cachedData = cache.get(key);
  if (cachedData !== undefined) {
    logger.debug(`Cache HIT pentru ${entity}:${key}`);
    return cachedData;
  }

  logger.debug(`Cache MISS pentru ${entity}:${key}`);
  const data = await fetchFn();

  if (data !== null && data !== undefined) {
    cache.set(key, data);
  }

  return data;
};

export const invalidateCache = (entity, key = null) => {
  const cache = cacheMap[entity];
  if (!cache) return;

  if (key) {
    cache.del(key);
    logger.debug(`Cache invalidat pentru ${entity}:${key}`);
  } else {
    cache.flushAll();
    logger.debug(`Tot cache-ul invalidat pentru ${entity}`);
  }
};

export const invalidateMultiple = (entity, keys) => {
  const cache = cacheMap[entity];
  if (!cache) return;

  cache.del(keys);
  logger.debug(`${keys.length} chei invalidate pentru ${entity}`);
};

export const getCacheStats = () => {
  return {
    user: userCache.getStats(),
    plan: planCache.getStats(),
    usage: usageCache.getStats(),
  };
};

export { userCache, planCache, usageCache };
