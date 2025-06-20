import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';
import { CacheTtl } from '../../../../../enums/cache-ttl';

interface OmdbResponse {
  Response: string;
  Error?: string;
  [key: string]: any;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const redisUrl = process.env.REDIS_URL!;
  const redis = new Redis(redisUrl, {
    tls: {
      rejectUnauthorized: false,
    },
    connectTimeout: 10000,
    retryStrategy: (times) => {
      const delay: number = Math.min(times * 50, 2000);
      return delay;
    },
  });

  const movieId = params.id;

  if (!movieId) {
    return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
  }

  const cacheKey = `movie:${movieId}`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return NextResponse.json(JSON.parse(cachedData), { status: 200 });
  }

  const BASE_URL: string = process.env.OMDB_API_URL || 'https://www.omdbapi.com';
  const API_URL: string = `${BASE_URL}/?i=${movieId}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: OmdbResponse = await response.json();

    if (data && data.Response === 'True') {
      await redis.set(cacheKey, JSON.stringify(data), 'EX', CacheTtl.ONE_WEEK);
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { error: data.Error || 'Movie not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie details' },
      { status: 500 }
    );
  } finally {
    await redis.quit();
  }
}
