'use client';

import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import { MediaDetails } from '../../models/MediaDetails';
import Image from 'next/image';
import { isValidImageUrl } from '../utils/is-valid-url';
import { useRouter, useSearchParams } from 'next/navigation';

const MediaItem = (media: MediaDetails) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const URL: string = `/api/search/id?movieId=${media.imdbID}`;

  const FALLBACK_IMAGE: string = 'https://picsum.photos/160/240/?blur=10';

  const handleClick = async () => {
    try {
      if (media.imdbID) {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('media', media.imdbID);
        router.push(`?${newSearchParams.toString()}`, { scroll: false });
        return;
      }

      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('media', data.imdbID);
      router.push(`?${newSearchParams.toString()}`, { scroll: false });
    } catch (error: any) {
      console.error('Error fetching media details:', error);
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const imageSrc = isValidImageUrl(media.Poster) ? media.Poster : FALLBACK_IMAGE;

  return (
    <Card className="media-element" onClick={handleClick}>
      <Container className="media-element-img-container">
        <Image
          src={imageSrc}
          alt={`Poster for ${media?.Title}`}
          width={160}
          height={240}
          className="media-element-img"
        />
      </Container>
      <Card.Content>
        <Card.Header>{media.Title}</Card.Header>
        <Card.Meta>{media.Year}</Card.Meta>
        <Card.Description>
          <p>{media.Year}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default MediaItem;
