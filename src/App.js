import axios from "axios"
import React, { useCallback, useEffect } from "react"
import debounce from "lodash.debounce"

import useStore from "./Store/store"

import MovieList from "./Components/MovieList"
import Search from "./Components/Search"
import MovieModal from "./Components/Modal"
import FavoritesSidebar from "./Components/FavoritesSidebar"
import SidebarToggler from "./Components/SidebarToggler"
import PageDim from "./Components/Dimmer"

import { Segment } from "semantic-ui-react"

import "./Style/style.scss"

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
        let filteredMovies = response.data.Search.filter(
          (list) => list.Type !== "game"
        )
        setMovieList(filteredMovies)
      })
      .catch((error) => console.log(error))
  }

  const delayedRequest = useCallback(debounce(movieRequest, 500), [searchValue])

  useEffect(() => {
    delayedRequest()
    if (searchValue === "") {
      setMovieList(null)
    }
    return delayedRequest.cancel
  }, [searchValue])

  useEffect(() => {
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList))
  }, [favoriteList])

  useEffect(() => {
    localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies))
  }, [ratedMovies])

  return (
    <div className="App">
      <FavoritesSidebar />
      <Segment basic className="app-container">
        <Search />
      </Segment>
      {movieList ? (
        <Segment basic className="app-container">
          <MovieList />
        </Segment>
      ) : null}
      <MovieModal />
      {favoriteList.length ? (
        <Segment basic>
          <SidebarToggler />
        </Segment>
      ) : null}
      <PageDim />
    </div>
  )
}

export default App
