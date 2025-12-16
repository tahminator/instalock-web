import { Redis, RedisClient } from "@/lib/redis";
import { Controller, HttpStatus, Middleware } from "@tahminator/sapling";
import { NextFunction, Request, Response } from "express";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import RedisStore from "rate-limit-redis";

@Controller({
  deps: [RedisClient],
})
export class RateLimiterMiddleware {
  private readonly redis: Redis;
  private readonly plugin: RateLimitRequestHandler;

  constructor(readonly redisClient: RedisClient) {
    this.redis = redisClient.get;
    this.plugin = rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      limit: 1000, // 1000 req/IP per 1 minute (~16 req/s is insane and should not be hit.)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers

      // Redis store configuration
      store: new RedisStore({
        // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
        sendCommand: (...args: string[]) => this.redis.call(...args),
      }),
      handler: (_, res) => {
        res.status(HttpStatus.TOO_MANY_REQUESTS).json({
          success: false,
          message:
            "You have been rate limited (sending too many requests). Please try again later.",
        });
      },
    });
  }

  @Middleware()
  register(request: Request, response: Response, next: NextFunction) {
    return this.plugin(request, response, next);
  }
}
