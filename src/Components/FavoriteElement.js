import React from "react"
import axios from "axios"
import { Menu } from "semantic-ui-react"
import useStore from "../Store/store"

const FavoriteElement = (props) => {
  const { movie } = props

  const setModalDetails = useStore((state) => state.setModalDetails)

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
      .catch((error) => console.log(error))
  }

  return (
    <Menu.Item onClick={() => getMovieDetails(movie.imdbID)}>
      {movie.Title} - {movie.Year}
    </Menu.Item>
  )
}

export default FavoriteElement
