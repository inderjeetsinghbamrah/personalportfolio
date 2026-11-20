import { Redis } from "@upstash/redis";

// Check if Upstash or standard Redis environment variables exist
const upstashUrl =
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.KV_REST_API_URL ||
  process.env.REDIS_URL ||
  "";

const upstashToken =
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.KV_REST_API_TOKEN ||
  "";

let redisClient: Redis | null = null;

if (upstashUrl && upstashToken && upstashUrl.startsWith("http")) {
  try {
    redisClient = new Redis({
      url: upstashUrl,
      token: upstashToken,
    });
  } catch (err) {
    console.warn("[Redis] Failed to initialize Upstash Redis client:", err);
  }
}

// In-Memory High-Speed Cache Fallback (for zero-latency local/fallback operation)
interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}
const memoryCache = new Map<string, CacheEntry<unknown>>();

// Telemetry counters
let cacheHits = 0;
let cacheMisses = 0;

/**
 * Checks whether an active Redis connection is available.
 */
export function isRedisActive(): boolean {
  return redisClient !== null;
}

export function getCacheTelemetry() {
  return {
    isRedis: isRedisActive(),
    hits: cacheHits,
    misses: cacheMisses,
    memoryItems: memoryCache.size,
  };
}

/**
 * Retrieve an item from Redis or in-memory fallback.
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  const now = Date.now();

  // 1. Try Upstash Redis if configured
  if (redisClient) {
    try {
      const result = await redisClient.get<T>(key);
      if (result !== null && result !== undefined) {
        cacheHits++;
        return result;
      }
    } catch (err) {
      console.warn(`[Redis] Error getting key "${key}":`, err);
    }
  }

  // 2. Fallback to in-memory cache
  const local = memoryCache.get(key);
  if (local) {
    if (local.expiresAt > now) {
      cacheHits++;
      return local.value as T;
    }
    memoryCache.delete(key);
  }

  cacheMisses++;
  return null;
}

/**
 * Store an item in Redis and in-memory fallback with a Time-To-Live (TTL).
 */
export async function cacheSet<T>(
  key: string,
  value: T,
  ttlSeconds: number = 3600
): Promise<void> {
  const now = Date.now();
  const expiresAt = now + ttlSeconds * 1000;

  // Store in memory
  memoryCache.set(key, { value, expiresAt });

  // Store in Upstash Redis
  if (redisClient) {
    try {
      await redisClient.set(key, value, { ex: ttlSeconds });
    } catch (err) {
      console.warn(`[Redis] Error setting key "${key}":`, err);
    }
  }
}

/**
 * Invalidate/delete a cache entry.
 */
export async function cacheDelete(key: string): Promise<void> {
  memoryCache.delete(key);

  if (redisClient) {
    try {
      await redisClient.del(key);
    } catch (err) {
      console.warn(`[Redis] Error deleting key "${key}":`, err);
    }
  }
}

/**
 * High-Security Rate Limiter backed by Redis/Memory.
 * Protects against brute-force attacks on sensitive endpoints.
 */
export async function cacheRateLimit(
  identifier: string,
  maxAttempts: number = 5,
  windowSeconds: number = 900 // 15 minutes
): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
  const key = `ratelimit:${identifier}`;
  const now = Date.now();

  if (redisClient) {
    try {
      const count = await redisClient.incr(key);
      if (count === 1) {
        await redisClient.expire(key, windowSeconds);
      }
      const ttl = await redisClient.ttl(key);
      const remaining = Math.max(0, maxAttempts - count);
      return {
        allowed: count <= maxAttempts,
        remaining,
        resetIn: ttl > 0 ? ttl : windowSeconds,
      };
    } catch {
      // Fallback to local memory limiter on network error
    }
  }

  // Local Memory Rate Limiter
  const existing = memoryCache.get(key) as CacheEntry<{ count: number }> | undefined;
  if (!existing || existing.expiresAt <= now) {
    memoryCache.set(key, {
      value: { count: 1 },
      expiresAt: now + windowSeconds * 1000,
    });
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      resetIn: windowSeconds,
    };
  }

  existing.value.count += 1;
  const remaining = Math.max(0, maxAttempts - existing.value.count);
  const resetIn = Math.ceil((existing.expiresAt - now) / 1000);

  return {
    allowed: existing.value.count <= maxAttempts,
    remaining,
    resetIn,
  };
}
