import axios from "axios"
import React from "react"
import useStore from "../Store/store"
import { Card, Image, Container } from "semantic-ui-react"

const Movie = (props) => {
  const { movie } = props
  const setModalDetails = useStore((state) => state.setModalDetails)
  const modalDetails = useStore((state) => state.modalDetails)

  const getMovieDetails = () => {
    const key = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=b46dc190`
    axios
      .get(key)
      .then((response) => {
        console.log(response.data)
        setModalDetails(response.data)
      })
      .then((response) => {
        console.log(modalDetails)
      })
      .catch((error) => console.log(error))
  }

  return (
    <Card
      className="movie-element"
      onClick={() => getMovieDetails(movie.imdbID)}
    >
      <Container className="movie-element-img-container">
        <Image
          src={movie.Poster}
          alt={`poster unavailable`}
          wrapped
          className="movie-element-img"
          centered
        />
      </Container>
      <Card.Content>
        <Card.Header>{movie.Title}</Card.Header>
        <Card.Description>
          <p>{movie.Year}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default Movie

// <div
//   key={movie.Title}
//   className="movie-element"
//   onClick={() => getMovieDetails(movie.imdbID)}
// >
//   <img src={movie.Poster} alt={`poster unavailable`} />
//   <div>
//     <h5>{movie.Title}</h5>
//     <p>{movie.Year}</p>
//   </div>
// </div>
