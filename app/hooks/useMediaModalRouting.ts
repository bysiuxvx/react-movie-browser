import { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';
import { modalDetailsAtom } from '../../store/store';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { MediaDetails } from '../../models/MediaDetails';

interface FetchError extends Error {
  status?: number;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as FetchError;
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const useMediaModalRouting = () => {
  const [modalDetails, setModalDetails] = useAtom(modalDetailsAtom);
  const router = useRouter();
  const searchParams = useSearchParams();
  const mediaId = searchParams.get('media');

  const { data, error, isLoading } = useSWR<MediaDetails>(
    mediaId ? `/api/search/id/${mediaId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError: (err: unknown) => {
        console.error('Error fetching media details:', err);
        const error = err as FetchError;
        if (error.status === 404) {
          toast.error('Media not found. Check the id?', { duration: 3000 });
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.delete('media');
          router.replace(`?${newSearchParams.toString()}`, { scroll: false });
        }
      },
    }
  );

  useEffect(() => {
    if (data) {
      setModalDetails(data);
    } else if (!mediaId) {
      setModalDetails(undefined);
    }
  }, [data, mediaId, setModalDetails]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const params = new URLSearchParams(window.location.search);
      const mediaId = params.get('media');

      if (!mediaId) {
        setModalDetails(undefined);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setModalDetails]);

  const handleClose = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('media');
    router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    setModalDetails(undefined);
  }, [router, searchParams, setModalDetails]);

  return {
    handleClose,
    mediaId,
  };
};
