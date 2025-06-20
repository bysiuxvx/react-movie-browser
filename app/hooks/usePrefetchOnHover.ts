import { useCallback, useRef } from 'react';
import { preload } from 'swr';

export const usePrefetchOnHover = (mediaId: string) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const PREFETCH_DELAY = 300; // ms

  const prefetchMedia = useCallback(async () => {
    if (!mediaId) return;

    await preload(`/api/search/id/${mediaId}`, (url: string) =>
      fetch(url).then((res) => res.json())
    );
  }, [mediaId]);

  const handleMouseEnter = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      prefetchMedia().catch(console.error);
    }, PREFETCH_DELAY);
  }, [prefetchMedia]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
};
