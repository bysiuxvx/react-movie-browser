import axios from "axios"
import React, { useEffect } from "react"
import useStore from "./Store/store"
import MovieList from "./Components/MovieList"
import Search from "./Components/Search"
import MovieModal from "./Components/Modal"
import { Segment } from "semantic-ui-react"
import FavoritesSidebar from "./Components/FavoritesSidebar"
import SidebarToggler from "./Components/SidebarToggler"
import PageDim from "./Components/Dimmer"
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
        setMovieList(response.data.Search)
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
      <FavoritesSidebar />
      <Segment basic>
        <Search />
        {movieList ? <MovieList /> : null}
        <MovieModal />
        {favoriteList.length ? <SidebarToggler /> : null}
      </Segment>
      <PageDim />
    </div>
  )
}

export default App
