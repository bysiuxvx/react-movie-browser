"use client"

import { useAtom } from "jotai"
import React, { useCallback, useEffect, useState } from "react"

import debounce from "lodash.debounce"

import {
  Button,
  Header,
  Image,
  Modal,
  Divider,
  Grid,
  Segment,
  Label,
  Rating,
} from "semantic-ui-react"
import { modalDetailsAtom } from "../../store/store"
import { MediaDetails } from "../../models/MediaDetails"
import {
  addToFavorites,
  removeFavorite,
  useFavorites,
} from "../utils/favorites-actions"

import { createRating, useRatings } from "../utils/ratings-actions"
import toast from "react-hot-toast"

const MediaModal = () => {
  const [favoriteButtonDisabled, setFavoritebuttonDisabled] = useState({
    add: false,
    remove: false,
  })
  const [ratingDisabled, setRatingDisabled] = useState(false)
  const [modalDetails, setModalDetails] = useAtom<MediaDetails | undefined>(
    modalDetailsAtom
  )

  const { favorites, isLoading, isError } = useFavorites()
  const {
    ratings,
    isLoading: ratingsIsLoading,
    isError: ratingsIsError,
  } = useRatings()

  const DEBOUNCE_TIME: number = 350

  const handleAddToFavorites = async (modalDetails: MediaDetails) => {
    setFavoritebuttonDisabled((prevState) => ({
      add: true,
      remove: false,
    }))
    try {
      toast.promise(addToFavorites(modalDetails), {
        loading: "⏱️ Adding...",
        success: <b>👏 Successfully added to favorites!</b>,
        error: <b>Could not add...</b>,
      })
    } catch (error) {
      setFavoritebuttonDisabled((prevState) => ({
        add: false,
        remove: false,
      }))
      console.error("Error adding to favorites:", error)
    }
  }

  const handleRemoveFavorite = async (itemId: string) => {
    setFavoritebuttonDisabled((prevState) => ({
      add: false,
      remove: true,
    }))
    try {
      toast.promise(removeFavorite(itemId), {
        loading: "⏱️ Removing...",
        success: <b>🗑️ Successfully removed from favorites!</b>,
        error: <b>Could not remove...</b>,
      })
    } catch (error) {
      setFavoritebuttonDisabled((prevState) => ({
        add: false,
        remove: false,
      }))
      console.error("Error removing from favorites:", error)
    }
  }

  useEffect(() => {
    setFavoritebuttonDisabled((prevState) => ({
      add: false,
      remove: false,
    }))
  }, [modalDetails])

  const debouncedHandleRateMedia = useCallback(
    debounce(async (value: number) => {
      if (!modalDetails) return

      setRatingDisabled(true)
      try {
        await toast.promise(createRating(modalDetails.imdbID, value), {
          loading: "⏱️ Rating...",
          success: <b>👏 Successfully rated {modalDetails.Title}!</b>,
          error: <b>Could not rate...</b>,
        })
      } catch (error) {
        console.error("Error adding to ratings:", error)
      } finally {
        setRatingDisabled(false)
      }
    }, DEBOUNCE_TIME),
    [modalDetails]
  )

  const handleRateMedia = (event: React.FormEvent<HTMLInputElement>) => {
    const rating = Number(event.currentTarget.value)
    debouncedHandleRateMedia(rating)
  }

  const isFavorite = favorites?.find(
    (item) => item.itemId === modalDetails?.imdbID
  )

  const mediaRating = modalDetails
    ? ratings.find((item) => item?.itemId === modalDetails.imdbID)?.rating
    : null

  return (
    <>
      {modalDetails && (
        <Modal onClose={() => setModalDetails(undefined)} open={!!modalDetails}>
          <Modal.Content image>
            <Image size="big" src={modalDetails.Poster} wrapped />
            <Modal.Description>
              <Header>
                {modalDetails.Title} {modalDetails.Year}{" "}
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
              {modalDetails.Ratings ? (
                <strong>
                  <p style={{ marginBottom: 10 }}>Ratings:</p>
                </strong>
              ) : null}
              {modalDetails.Ratings
                ? modalDetails.Ratings.map((rating) => (
                    <p>
                      <strong>{rating.Source}:</strong> {rating.Value}
                    </p>
                  ))
                : null}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Segment>
              <Grid columns={2} relaxed="very" centered>
                <Grid.Column centered textAlign="center">
                  <Label>How would you rate this {modalDetails.Type}?</Label>
                  <p style={{ margin: "7px 0" }}>
                    {mediaRating
                      ? `Your rating: ${mediaRating}`
                      : "You haven't rated it yet. Did you like it?"}
                  </p>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={mediaRating ? mediaRating : 0}
                    disabled={ratingDisabled}
                    onChange={handleRateMedia}
                  />
                  <br />
                  <br />
                  <Rating
                    className="star-rating"
                    icon="star"
                    rating={mediaRating ? mediaRating : 0}
                    disabled={ratingDisabled}
                    maxRating={10}
                  />
                </Grid.Column>
                <Grid.Column centered textAlign="center">
                  {isFavorite ? (
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
                      disabled={favoriteButtonDisabled.add}
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
  )
}

export default MediaModal
