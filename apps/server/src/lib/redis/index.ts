import RedisClient from "ioredis";

if (!process.env.REDIS_URL) {
  throw new Error("Redis URL is not set in environment.");
}

export const redis = new RedisClient(process.env.REDIS_URL, {
  lazyConnect: true,
});
