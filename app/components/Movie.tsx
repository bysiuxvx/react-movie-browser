"use client"

import React from "react"
import axios from "axios"

import useStore from "../../store/store"

// import { MovieDetails } from ".././types/MovieDetails"

import { Card, Image, Container } from "semantic-ui-react"

// interface MovieProps {
//   movie: MovieDetails
// }

const Movie = ({ movie }) => {
  // const Movie = ({ movie }: MovieProps) => {
  const setModalDetails = useStore((state) => state.setModalDetails)

  const getMovieDetails = () => {
    const key = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=b46dc190`
    axios
      .get(key)
      .then((response) => {
        setModalDetails(response.data)
      })
      .catch((error) => console.log(error))
  }

  return (
    <Card className="movie-element" onClick={() => getMovieDetails()}>
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
