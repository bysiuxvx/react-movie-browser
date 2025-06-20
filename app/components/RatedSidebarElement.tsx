'use client';

import React from 'react';
import { sidebarVisibleAtom } from '../../store/store';
import { Menu } from 'semantic-ui-react';
import { useAtom } from 'jotai';
import { Rating } from '@prisma/client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const RatedElement = (ratedItem: Rating) => {
  const [, setSidebarVisible] = useAtom(sidebarVisibleAtom);
  const searchParams = useSearchParams();
  const router = useRouter();

  const MIN_WINDOW_WIDTH: number = 1440;
  const href = `?media=${ratedItem.itemId}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (window.innerWidth < MIN_WINDOW_WIDTH) {
      setSidebarVisible(false);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('media', ratedItem.itemId);
    router.push(`?${params.toString()}`);
  };

  return (
    <Menu.Item as={Link} href={href} onClick={handleClick}>
      {ratedItem?.title} - {ratedItem?.itemYear}
    </Menu.Item>
  );
};

export default RatedElement;
