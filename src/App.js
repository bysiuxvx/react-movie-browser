import axios from "axios"
import React, { useEffect } from "react"
import useStore from "./Store/store"
import Layout from "./Layout"
import MovieList from "./Components/MovieList"
import Search from "./Components/Search"
import MovieModal from "./Components/Modal"
import "./Style/style.scss"

const App = () => {
  const searchValue = useStore((state) => state.searchValue)
  const setMovieList = useStore((state) => state.setMovieList)

  const favoriteList = useStore((state) => state.favoriteList)

  const movieRequest = () => {
    const key = `https://www.omdbapi.com/?s=${searchValue}&apikey=b46dc190`
    axios
      .get(key)
      .then((response) => {
        // for (const element of response.data) {
        //   element.userRating = null
        // }
        // const updatedResponse = response.data.forEach(
        //   (movie) => (movie.userRating = null)
        // )
        // setMovieList(updatedResponse)
        setMovieList(response.data)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    movieRequest(searchValue)
    if (searchValue === "") {
      setMovieList([])
    }
  })

  useEffect(() => {
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList))
  }, [favoriteList])

  return (
    <div className="App">
      {/* <Layout /> */}
      <Search />
      <MovieList />
      <MovieModal />
    </div>
  )
}

export default App
