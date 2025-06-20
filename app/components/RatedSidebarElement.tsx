'use client';

import React from 'react';
import { modalDetailsAtom, sidebarVisibleAtom } from '../../store/store';
import { Menu } from 'semantic-ui-react';
import { useAtom } from 'jotai';
import { Rating } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

const RatedElement = (ratedItem: Rating) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modalDetails, setModalDetails] = useAtom(modalDetailsAtom);
  const [, setSidebarVisible] = useAtom(sidebarVisibleAtom);

  const MIN_WINDOW_WIDTH: number = 1440;
  const URL: string = `/api/search/id?movieId=${ratedItem.itemId}`;

  const handleClick = async () => {
    try {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('media', ratedItem.itemId);
      router.push(`?${newSearchParams.toString()}`, { scroll: false });

      if (window.innerWidth < MIN_WINDOW_WIDTH) {
        setSidebarVisible(false);
      }

      if (modalDetails?.imdbID !== ratedItem.itemId) {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setModalDetails(data);
      }
    } catch (error: any) {
      console.error('Error fetching media details:', error);

      if (error instanceof Error) {
        console.error(`Error: ${error.message || 'Failed to fetch movie details'}`);
      } else {
        console.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <Menu.Item onClick={handleClick}>
      {ratedItem?.title} - {ratedItem?.itemYear}
    </Menu.Item>
  );
};

export default RatedElement;
