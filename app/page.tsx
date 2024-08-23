"use client"

import axios from "axios"
import React, { useCallback, useEffect } from "react"
import debounce from "lodash.debounce"
import { Segment } from "semantic-ui-react"

import FavoritesSidebar from "./components/FavoritesSidebar"
import Search from "./components/Search"
import MovieList from "./components/MovieList"
import MovieModal from "./components/Modal"
import SidebarToggler from "./components/SidebarToggler"
import PageDimmer from "./components/Dimmer"

import useStore from "../store/store"
import { SearchItemTypes } from "../enums/SearchItemTypes"

const HomePage = () => {
  const searchValue = useStore((state) => state.searchValue)
  const movieList = useStore((state) => state.movieList)
  const setMovieList = useStore((state) => state.setMovieList)
  const favoriteList = useStore((state) => state.favoriteList)
  const ratedMovies = useStore((state) => state.ratedMovies)

  const URL: string = `https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  const DEBOUNCE_TIME: number = 500

  const fetchMovies = useCallback(
    debounce(
      () =>
        searchValue
          ? axios
              .get(URL)
              .then(({ data }) => {
                const filteredMovies = data.Search.filter(
                  ({ Type }) => Type !== SearchItemTypes.GAME
                )
                setMovieList(filteredMovies)
              })
              .catch((error) => console.error(error))
          : null,
      DEBOUNCE_TIME
    ),
    [searchValue, setMovieList]
  )

  useEffect(() => {
    if (searchValue) {
      fetchMovies()
    } else {
      setMovieList([])
    }
    return fetchMovies.cancel
  }, [searchValue, fetchMovies])

  // useEffect(() => {
  //   localStorage.setItem("favoriteList", JSON.stringify(favoriteList))
  // }, [favoriteList])

  // useEffect(() => {
  //   localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies))
  // }, [ratedMovies])

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
      {favoriteList ? (
        <Segment basic>
          <SidebarToggler />
        </Segment>
      ) : null}
      <PageDimmer />
    </div>
  )
}

export default HomePage
