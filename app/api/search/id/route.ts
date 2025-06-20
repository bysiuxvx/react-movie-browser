import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';
import { CacheTtl } from '../../../../enums/cache-ttl';

interface OmdbResponse {
  Response: string;
  Error?: string;
  [key: string]: any;
}

export async function GET(request: NextRequest) {
  console.log('REDIS_URL exists:', !!process.env.REDIS_URL);
  console.log('REDIS_URL starts with:', process.env.REDIS_URL?.substring(0, 10) + '...');

  const redisUrl = process.env.REDIS_URL!;
  const redis = new Redis(redisUrl, {
    tls: {
      rejectUnauthorized: false, // Needed for some Redis providers
    },
    connectTimeout: 10000, // 10 seconds
    retryStrategy: (times) => {
      const delay: number = Math.min(times * 50, 2000);
      return delay;
    },
  });
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('movieId');

  if (!movieId) {
    return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
  }

  console.log('Movie ID: ', movieId);
  const cacheKey = `movie:${movieId}`;
  const cachedData = await redis.get(cacheKey);

  console.log(cachedData);
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
        { error: data.Error || 'Movie not found or API returned an error' },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error('Error fetching media details:', error);

    if (error instanceof Error) {
      if (error.message.includes('HTTP error')) {
        return NextResponse.json({ error: 'Failed to fetch data from the API' }, { status: 500 });
      }
      return NextResponse.json(
        { error: error.message || 'An unexpected error occurred' },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
