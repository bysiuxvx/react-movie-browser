'use client';

import React from 'react';
import { sidebarVisibleAtom } from '../../store/store';
import { Menu } from 'semantic-ui-react';
import { useAtom } from 'jotai';
import { Favorite } from '@prisma/client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePrefetchOnHover } from '../hooks/usePrefetchOnHover';

const FavoriteElement = (media: Favorite) => {
  const [, setSidebarVisible] = useAtom(sidebarVisibleAtom);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { onMouseEnter, onMouseLeave } = usePrefetchOnHover(media.itemId);

  const MIN_WINDOW_WIDTH: number = 1440;
  const href = `?media=${media.itemId}`;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (window.innerWidth < MIN_WINDOW_WIDTH) {
      setSidebarVisible(false);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('media', media.itemId);
    router.push(`?${params.toString()}`);
  };

  return (
    <Menu.Item
      as={Link}
      href={href}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {media?.itemName} - {media?.itemYear}
    </Menu.Item>
  );
};

export default FavoriteElement;
