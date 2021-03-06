import React from "react"
import axios from "axios"

import useStore from "../Store/store"

import { MovieDetails } from ".././types/MovieDetails"

import { Menu } from "semantic-ui-react"

interface MovieProps {
  movie: MovieDetails
}

const FavoriteElement = ({ movie }: MovieProps) => {
  const setModalDetails = useStore((state) => state.setModalDetails)
  const setSidebarVisible = useStore((state) => state.setSidebarVisible)

  const getMovieDetails = () => {
    const key = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=b46dc190`
    axios
      .get(key)
      .then((response) => {
        setModalDetails(response.data)
        if (window.innerWidth < 1440) setSidebarVisible(false)
        else return
      })
      .catch((error) => console.log(error))
  }

  return (
    <Menu.Item onClick={() => getMovieDetails()}>
      {movie.Title} - {movie.Year}
    </Menu.Item>
  )
}

export default FavoriteElement
