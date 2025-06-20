'use client';

import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import { MediaDetails } from '../../models/MediaDetails';
import Image from 'next/image';
import { isValidImageUrl } from '../utils/is-valid-url';
import Link from 'next/link';

const MediaItem = (media: MediaDetails) => {
  const FALLBACK_IMAGE: string = 'https://picsum.photos/160/240/?blur=10';
  const imageSrc = isValidImageUrl(media.Poster) ? media.Poster : FALLBACK_IMAGE;
  const href = `?media=${media.imdbID}`;

  return (
    <Link href={href} scroll={false} className="media-element-link">
      <Card className="media-element">
        <Container className="media-element-img-container">
          <Image
            src={imageSrc}
            alt={`Poster for ${media?.Title}`}
            width={160}
            height={240}
            className="media-element-img"
            priority={false}
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
    </Link>
  );
};

export default MediaItem;
