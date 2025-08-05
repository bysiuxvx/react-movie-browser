import { useCallback, useEffect, useRef } from 'react';
import { preload, useSWRConfig } from 'swr';

export const usePrefetchOnHover = (mediaId: string) => {
  const timeoutRef = useRef<number | null>(null);
  const { cache } = useSWRConfig();
  const PREFETCH_DELAY = 300;

  const prefetchMedia = useCallback(async () => {
    if (!mediaId) return;

    const cacheKey = `/api/search/id/${mediaId}`;

    const cachedData = cache.get(cacheKey);

    if (!cachedData || (cachedData.data === undefined && !cachedData.isValidating)) {
      await preload(cacheKey, (url: string) =>
        fetch(url, {
          headers: {
            'Cache-Control': 'public, max-age=3600',
          },
        }).then((res) => res.json())
      );
    }
  }, [mediaId, cache]);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      prefetchMedia().catch(console.error);
    }, PREFETCH_DELAY);
  }, [prefetchMedia]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
};
