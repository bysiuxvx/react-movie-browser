import axios from "axios"
import React, { useEffect, useState } from "react"
import useStore from "./Store/store"
import Layout from "./Layout"
import MovieList from "./Components/MovieList"
import Search from "./Components/Search"
import MovieModal from "./Components/Modal"
import "./Style/style.scss"

import { Segment, Sidebar } from "semantic-ui-react"
import FavoritesSidebar from "./Components/FavoritesSidebar"

const App = () => {
  const searchValue = useStore((state) => state.searchValue)
  const movieList = useStore((state) => state.movieList)
  const setMovieList = useStore((state) => state.setMovieList)

  const favoriteList = useStore((state) => state.favoriteList)
  const ratedMovies = useStore((state) => state.ratedMovies)

  const key = `https://www.omdbapi.com/?s=${searchValue}&apikey=b46dc190`

  const movieRequest = () => {
    axios
      .get(key)
      .then((response) => {
        if (
          ratedMovies.find(
            (movie) => movie.imdbID === response.data.Search.imdbID
          )
        ) {
        }
        const updatedResponse = response.data.Search.map((movie) => ({
          ...movie,
          userRating: null,
        }))
        setMovieList(updatedResponse)
        console.log("this is the movie list state", movieList)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    movieRequest(searchValue)
    if (searchValue === "") {
      setMovieList([])
    }
  }, [searchValue])

  useEffect(() => {
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList))
  }, [favoriteList])

  useEffect(() => {
    localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies))
  }, [ratedMovies])

  return (
    <div className="App">
      {favoriteList.length ? <FavoritesSidebar /> : null}
      {/* <Sidebar.Pusher dimmed={sidebarVisible} inverted> */}
      <Segment basic>
        <Search />
        {movieList.length === 0 ? null : <MovieList />}
        <MovieModal />
      </Segment>
      {/* </Sidebar.Pusher> */}
    </div>
  )
}

export default App
