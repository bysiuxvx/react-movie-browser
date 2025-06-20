import { useCallback, useEffect, useRef } from 'react';
import { preload } from 'swr';

export const usePrefetchOnHover = (mediaId: string) => {
  const timeoutRef = useRef<number | null>(null);
  const PREFETCH_DELAY = 300; // ms

  const prefetchMedia = useCallback(async () => {
    if (!mediaId) return;

    await preload(`/api/search/id/${mediaId}`, (url: string) =>
      fetch(url).then((res) => res.json())
    );
  }, [mediaId]);

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
