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

// import FavoritesHandler from "./FavoritesHandler"

const MovieModal = () => {
  const modalDetails = useStore((state) => state.modalDetails)
  const clearModalDetails = useStore((state) => state.setModalDetails)

  const favoriteList = useStore((state) => state.favoriteList)
  const addToFavorites = useStore((state) => state.addToFavorites)
  const removeFromFavorites = useStore((state) => state.removeFromFavorites)

  const modalOpen = modalDetails ? true : false

  const ratedMovies = useStore((state) => state.ratedMovies)
  const setUserRating = useStore((state) => state.setUserRating)

  const [ratingChanged, setRatingChanged] = useState(false)

  const movieRating = ratedMovies.find((movie) =>
    movie.imdbID === modalDetails.imdbID ? movie.userRating : 0
  )

  return (
    <>
      {modalDetails && (
        <Modal onClose={() => clearModalDetails(null)} open={modalOpen}>
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
                  <p>Rating:</p>
                </strong>
              ) : null}
              {modalDetails.Ratings.length > 0 || modalDetails.Ratings !== []
                ? modalDetails.Ratings.map((rating) => (
                    <p>
                      <strong>{rating.Source}:</strong> {rating.Value}
                    </p>
                  ))
                : null}
              <p>{favoriteList.length}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Segment>
              <Grid columns={2} relaxed="very" centered>
                <Grid.Column centered textAlign="center">
                  <Label>How would you rate this movie?</Label>
                  <p>
                    Rating: {movieRating}
                    {/* {ratingChanged ? userMovieRating : "Haven't watched yet"} */}
                  </p>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    // value={userMovieRating}
                    // onChange={(event, modalDetails) => {
                    //   setUserRating(modalDetails.imdbID, event.target.value)
                    // }}
                  />
                  <Rating icon="star" value={movieRating} maxRating={10} />
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
