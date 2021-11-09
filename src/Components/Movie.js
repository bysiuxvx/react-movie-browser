import axios from "axios"
import React from "react"
import useStore from "../Store/store"
import { Card, Image, Container } from "semantic-ui-react"

const Movie = (props) => {
  const { movie } = props
  const setModalDetails = useStore((state) => state.setModalDetails)
  const modalDetails = useStore((state) => state.modalDetails)

  // const ratedMovies = useStore((state) => state.ratedMovies)

  const ratedMovies = [
    { imdbID: "tt2700662", userRating: 10 },
    { imdbID: "tt6038600", userRating: 5 },
  ]

  const getMovieDetails = () => {
    const key = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=b46dc190`
    axios
      .get(key)
      .then((response) => {
        // tutaj sprawdzanie czy film ktory wywoluje w funkcji
        // getMovieDetails byl juz wczesniej oceniany i czy jego ID (imdbID)
        // znajduje sie w stanie(array) ratedMovies
        //
        // chcialbym sprawdzic czy film byl oceniony i jezeli tak to dodac property
        // userRating: poprzednia ocena, a jezeli nie to userRating: null
        // setModalDetails(response.data)

        let data = response.data
        // let newMovieId = data.imdbID
        // if (state.ratedMovies.find((movie) => movie.imdbID === rating.imdbID)) {

        // if (ratedMovies.find((movie) => movie.imdbID === data.imdbID)) {
        //   data.userRating = movie.userRating
        // }
        // else data.userRating = null

        // ratedMovies.forEach((movie) => {
        //   if (movie.imdbID === data.imdbID) {
        //     return (data.userRating = movie.userRating)
        //   } else if (movie.imdbID !== data.imdbID || ratedMovies === []) {
        //     return (data.userRating = null)
        //   }
        // })

        // console.log("modal detail", data)
        setModalDetails(data)
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
