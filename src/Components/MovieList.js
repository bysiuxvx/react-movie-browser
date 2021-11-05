import React from "react"
import useStore from "../Store/store"
import Movie from "./Movie"

const MovieList = () => {
  const movieList = useStore((state) => state.movieList)

  return (
    <>
      {movieList.Search && (
        <div className="list-container">
          {movieList.Search.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} />
          ))}
        </div>
      )}
    </>
  )
}

export default MovieList
