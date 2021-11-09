import React, { useState } from "react"
import useStore from "../Store/store"
import {
  Button,
  Header,
  Image,
  Modal,
  Divider,
  Grid,
  Segment,
  Rating,
  Label,
  Icon,
} from "semantic-ui-react"

const MovieModal = () => {
  const modalDetails = useStore((state) => state.modalDetails)
  const clearModalDetails = useStore((state) => state.setModalDetails)

  const favoriteList = useStore((state) => state.favoriteList)
  const addToFavorites = useStore((state) => state.addToFavorites)
  const removeFromFavorites = useStore((state) => state.removeFromFavorites)

  // const ratedMovies = useStore((state) => state.ratedMovies)
  const setUserRating = useStore((state) => state.setUserRating)

  const ratedMovies = [
    { imdbID: "tt2700662", userRating: 10 },
    { imdbID: "tt6038600", userRating: 5 },
  ]

  const [ratingChanged, setRatingChanged] = useState(false)
  const [movieRating, setRating] = useState(
    modalDetails
      ? ratedMovies.find((movie) => movie.imdbID === modalDetails.imdbID)
      : null
  )

  // ? ratedMovies.find((movie) => movie.imdbID === modalDetails.imdbID)
  // : null

  // const movieRating = modalOpen
  //   ? ratedMovies.find((movie) =>
  //       movie.imdbID === modalDetails.imdbID ? movie.userRating : 0
  //     )
  //   : null

  const changeUserMovieRating = (event) => {
    const movieRating = {
      imdbID: modalDetails.imdbID,
      userRating: event.target.value,
    }
    setUserRating(movieRating)
  }

  return (
    <>
      {modalDetails && (
        <Modal
          onClose={() => clearModalDetails(null)}
          open={modalDetails ? true : false}
        >
          <Modal.Content image>
            <Image size="medium" src={modalDetails.Poster} wrapped />
            <Modal.Description>
              <Header>
                {modalDetails.Title} {modalDetails.Year}
              </Header>
              <p>
                <strong>Genre:</strong> {modalDetails.Genre}
              </p>{" "}
              <p>
                <strong>Director:</strong> {modalDetails.Director}
              </p>
              <p>{modalDetails.Plot}</p>
              {modalDetails.Ratings.length > 0 ||
              modalDetails.Ratings !== [] ? (
                <strong>
                  <p style={{ marginBottom: 10 }}>Rating:</p>
                </strong>
              ) : null}
              {modalDetails.Ratings.length > 0 || modalDetails.Ratings !== []
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
                  <Label>How would you rate this movie?</Label>
                  <p>
                    Your rating: {movieRating}
                    {/* {movieRating === null
                      ? "Watch it first!"
                      : movieRating.userRating} */}
                    {/* {ratingChanged ? userMovieRating : "Haven't watched yet"} */}
                    {/* {modalDetails.userRating === null
                      ? "Watch it first!"
                      : modalDetails.userRating}
                    {ratingChanged ? userMovieRating : "Haven't watched yet"} */}
                  </p>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={
                      modalDetails.userRating === null
                        ? 0
                        : modalDetails.userRating
                    }
                    onChange={changeUserMovieRating}
                  />
                  {/* <Rating icon="star" value={movieRating} maxRating={10} /> */}
                </Grid.Column>
                <Grid.Column centered textAlign="center">
                  {favoriteList.find(
                    (item) => item.imdbID === modalDetails.imdbID
                  ) ? (
                    <Button
                      onClick={() => removeFromFavorites(modalDetails.imdbID)}
                      color="red"
                    >
                      Remove from favorites
                    </Button>
                  ) : (
                    <Button
                      onClick={() => addToFavorites(modalDetails)}
                      color="blue"
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

export default MovieModal
