import React from "react"
import useStore from "../Store/store"
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

const MovieModal = () => {
  const modalDetails = useStore((state) => state.modalDetails)
  const clearModalDetails = useStore((state) => state.setModalDetails)

  const favoriteList = useStore((state) => state.favoriteList)
  const addToFavorites = useStore((state) => state.addToFavorites)
  const removeFromFavorites = useStore((state) => state.removeFromFavorites)

  const ratedMovies = useStore((state) => state.ratedMovies)
  const addUserRating = useStore((state) => state.addUserRating)
  const changeUserMovieRating = (event) => {
    const newRating = {
      imdbID: modalDetails.imdbID,
      userRating: event.target.value,
      ratedBefore: true,
    }
    let currentRatings = ratedMovies
    let newState = Object.assign({}, currentRatings)
    newState[newRating.imdbID] = newRating.userRating
    addUserRating(newState)
  }

  const movieRating = modalDetails ? ratedMovies[modalDetails.imdbID] : null

  return (
    <>
      {modalDetails && (
        <Modal
          onClose={() => clearModalDetails(null)}
          open={modalDetails ? true : false}
        >
          <Modal.Content image>
            <Image size="big" src={modalDetails.Poster} wrapped />
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
                  <p style={{ margin: "7px 0" }}>
                    Your rating:{" "}
                    {movieRating
                      ? movieRating
                      : "You haven't rated it yet. Did you like it?"}
                  </p>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={movieRating ? movieRating : 0}
                    onChange={changeUserMovieRating}
                  />
                  <br />
                  <br />
                  <Rating
                    icon="star"
                    rating={movieRating ? movieRating : 0}
                    maxRating={10}
                  />
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
