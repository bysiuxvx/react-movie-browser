'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { useAtom } from 'jotai';
import { modalDetailsAtom } from '../../store/store';

import debounce from 'lodash.debounce';

import { createRating, removeRating, useRatings } from '../utils/ratings-actions';

import { addToFavorites, removeFavorite, useFavorites } from '../utils/favorites-actions';

import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  List,
  Modal,
  Rating,
  Segment,
} from 'semantic-ui-react';
import { MediaDetails } from '../../models/MediaDetails';

import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';
import { isValidImageUrl } from '../utils/is-valid-url';
import { CreateRating } from '../../models/create-rating';

const MediaModal = () => {
  const [favoriteButtonDisabled, setFavoritebuttonDisabled] = useState({
    add: false,
    remove: false,
  });
  const [ratingDisabled, setRatingDisabled] = useState(false);
  const [optimisticRating, setOptimisticRating] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [tempRating, setTempRating] = useState<number | null>(null);
  const [modalDetails, setModalDetails] = useAtom<MediaDetails | undefined>(modalDetailsAtom);

  const { user } = useUser();

  const { favorites, isLoading, isError } = useFavorites();
  const { ratings, isLoading: ratingsIsLoading, isError: ratingsIsError } = useRatings();

  const DEBOUNCE_TIME: number = 350;
  const NOT_AVAILABLE: string = 'N/A';
  const FALLBACK_IMAGE: string = 'https://picsum.photos/200/300/?blur=10';

  const handleAddToFavorites = async (modalDetails: MediaDetails) => {
    setFavoritebuttonDisabled((prevState) => ({
      add: true,
      remove: false,
    }));
    try {
      toast.promise(addToFavorites(modalDetails), {
        loading: '⏱️ Adding...',
        success: <b>👏 Successfully added to favorites!</b>,
        error: <b>Could not add...</b>,
      });
    } catch (error) {
      setFavoritebuttonDisabled((prevState) => ({
        add: false,
        remove: false,
      }));
      console.error('Error adding to favorites:', error);
    }
  };

  const handleRemoveFavorite = async (itemId: string) => {
    setFavoritebuttonDisabled((prevState) => ({
      add: false,
      remove: true,
    }));
    try {
      toast.promise(removeFavorite(itemId), {
        loading: '⏱️ Removing...',
        success: <b>🗑️ Successfully removed from favorites!</b>,
        error: <b>Could not remove...</b>,
      });
    } catch (error) {
      setFavoritebuttonDisabled((prevState) => ({
        add: false,
        remove: false,
      }));
      console.error('Error removing from favorites:', error);
    }
  };

  const isFavorite = favorites?.find((item) => item.itemId === modalDetails?.imdbID);

  useEffect(() => {
    setFavoritebuttonDisabled((prevState) => ({
      add: false,
      remove: false,
    }));
  }, [modalDetails]);

  const debouncedHandleRateMedia = useCallback(
    debounce(async (newRatingValue: number) => {
      const updatedRating: CreateRating = {
        itemId: modalDetails?.imdbID ?? '',
        title: modalDetails?.Title ?? '',
        itemYear: modalDetails?.Year ?? '',
        rating: newRatingValue,
      };

      try {
        await toast.promise(createRating(updatedRating), {
          loading: '⏱️ Rating...',
          success: <b>👏 Successfully rated!</b>,
          error: <b>Could not rate...</b>,
        });
      } catch (error) {
        const previousRating: number =
          ratings.find((rating) => rating.itemId === modalDetails?.imdbID)?.rating ?? 0;
        setOptimisticRating(previousRating);
      } finally {
        setRatingDisabled(false);
      }
    }, DEBOUNCE_TIME),
    [modalDetails, ratings]
  );

  const handleMouseUp = () => {
    if (isDragging && tempRating !== null) {
      handleRateMedia(tempRating);
      setIsDragging(false);
    }
  };

  const handleRateMedia = (rating: number) => {
    if (rating === 0) {
      handleRemoveRating(modalDetails!.imdbID);
      return;
    }

    setOptimisticRating(rating);
    setTempRating(rating);
    debouncedHandleRateMedia(rating);
  };

  const handleRemoveRating = async (itemId: string) => {
    setRatingDisabled(true);
    try {
      await toast.promise(removeRating(itemId), {
        loading: '⏱️ Removing...',
        success: <b>🗑️ Successfully removed from ratings!</b>,
        error: <b>Could not remove...</b>,
      });
    } catch (error) {
      console.error('Error removing from ratings:', error);
    } finally {
      setRatingDisabled(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setOptimisticRating(null);
      setTempRating(null);
      return;
    }
    if (modalDetails) {
      const existingRating =
        ratings.find((item) => item.itemId === modalDetails.imdbID)?.rating || null;
      setOptimisticRating(existingRating);
      setTempRating(existingRating);
    }
  }, [modalDetails, ratings]);

  const userRatingForCurrentMedia =
    user && modalDetails
      ? ratings.find((rating) => rating.itemId === modalDetails.imdbID)?.rating
      : null;

  const imageSrc = isValidImageUrl(modalDetails?.Poster) ? modalDetails?.Poster : FALLBACK_IMAGE;

  return (
    <>
      {modalDetails && (
        <Modal onClose={() => setModalDetails(undefined)} open={!!modalDetails}>
          <Modal.Content image>
            <Image size="big" src={imageSrc} wrapped />
            <Modal.Description>
              <Header>
                {modalDetails.Title} {modalDetails.Year}{' '}
                <div className="ui horizontal label">{modalDetails.Type}</div>
              </Header>
              <p>
                <strong>Genre:</strong> {modalDetails.Genre}
              </p>
              <p>
                <strong>Director:</strong> {modalDetails.Director}
              </p>
              <p>
                <strong>Runtime:</strong> {modalDetails.Runtime}
              </p>
              <p>{modalDetails.Plot}</p>
              {modalDetails.Awards && modalDetails.Awards !== NOT_AVAILABLE && (
                <p>
                  <strong>Awards:</strong> {modalDetails.Awards}
                </p>
              )}
              {modalDetails.Ratings ? (
                <List divided relaxed>
                  {modalDetails.Ratings?.map((rating, i) => (
                    <List.Item key={i}>
                      <List.Content>
                        <List.Header>{rating.Source}</List.Header>
                        <List.Description>{rating.Value}</List.Description>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              ) : null}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {!user && (
              <Segment basic textAlign="center">
                <h4>Please log in to rate and save your favorite movies and series!</h4>
              </Segment>
            )}
            <Segment>
              <Grid columns={2} relaxed="very" centered>
                <Grid.Column centered textAlign="center">
                  <Label>How would you rate this {modalDetails.Type}?</Label>
                  <div className="rating-container">
                    <p>
                      {user && optimisticRating !== null
                        ? `Your rating: ${optimisticRating}`
                        : "You haven't rated it yet. Did you like it?"}
                    </p>
                    {userRatingForCurrentMedia ? (
                      <Icon
                        name="remove"
                        inverted
                        circular
                        link
                        disabled={ratingDisabled}
                        size="small"
                        onClick={() => handleRemoveRating(modalDetails.imdbID)}
                      />
                    ) : null}
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={tempRating !== null ? tempRating : userRatingForCurrentMedia || 0}
                    disabled={ratingDisabled || !user}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={handleMouseUp}
                    onChange={(event) => setTempRating(Number(event.target.value))}
                  />
                  <br />
                  <br />
                  <Rating
                    className="star-rating"
                    icon="star"
                    rating={tempRating !== null ? tempRating : userRatingForCurrentMedia || 0}
                    disabled={ratingDisabled}
                    maxRating={10}
                  />
                </Grid.Column>
                <Grid.Column centered textAlign="center">
                  {user && isFavorite ? (
                    <Button
                      onClick={() => handleRemoveFavorite(modalDetails.imdbID)}
                      color="red"
                      disabled={favoriteButtonDisabled.remove}
                    >
                      Remove from favorites
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAddToFavorites(modalDetails)}
                      color="blue"
                      disabled={favoriteButtonDisabled.add || !user}
                    >
                      Add to favorites
                    </Button>
                  )}
                </Grid.Column>
              </Grid>
              <Divider vertical />
            </Segment>
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
};

export default MediaModal;
