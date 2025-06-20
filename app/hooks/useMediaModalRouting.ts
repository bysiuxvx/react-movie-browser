import { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';
import { modalDetailsAtom } from '../../store/store';

export const useMediaModalRouting = () => {
  const [modalDetails, setModalDetails] = useAtom(modalDetailsAtom);
  const router = useRouter();
  const searchParams = useSearchParams();
  const mediaId = searchParams.get('media');

  const fetchMediaDetails = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/search/id/${id}`);
        if (response.ok) {
          const data = await response.json();
          setModalDetails(data);
        }
      } catch (error) {
        console.error('Error fetching media details:', error);
      }
    },
    [setModalDetails]
  );

  useEffect(() => {
    if (mediaId) {
      if (!modalDetails || modalDetails.imdbID !== mediaId) {
        fetchMediaDetails(mediaId).catch((error) => {
          console.error('Failed to fetch media details:', error);
        });
      }
    } else {
      setModalDetails(undefined);
    }
  }, [mediaId, modalDetails, setModalDetails, fetchMediaDetails]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const params = new URLSearchParams(window.location.search);
      const mediaId = params.get('media');

      if (!mediaId) {
        setModalDetails(undefined);
      } else if (modalDetails?.imdbID !== mediaId) {
        fetchMediaDetails(mediaId).catch((error) => {
          console.error('Failed to fetch media details in popstate:', error);
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [modalDetails, setModalDetails, fetchMediaDetails]);

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
