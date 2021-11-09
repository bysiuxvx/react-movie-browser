import create from "zustand"

const useStore = create((set) => ({
  favoriteList: JSON.parse(localStorage.getItem("favoriteList") || "[]"),
  ratedMovies: JSON.parse(localStorage.getItem("ratedMovies") || "[]"),

  searchValue: "",
  sidebarVisible: true,
  movieList: [],
  modalDetails: null,

  setSearchValue: (value) => set({ searchValue: value }),
  setMovieList: (list) => set({ movieList: list }),
  setModalDetails: (details) => set({ modalDetails: details }),
  setSidebarVisible: (sidebarVisible) => set(!sidebarVisible),

  addToFavorites: (movie) => {
    set((state) => ({
      favoriteList: [movie, ...state.favoriteList],
    }))
  },

  setUserRating: (rating) => {
    set((state) => {
      if (state.ratedMovies.find((movie) => movie.imdbID === rating.imdbID)) {
        let index = state.ratedMovies.findIndex(
          (movie) => movie.imdbID === rating.imdbID
        )
        index.userRating = rating.userRating
        return [index, ...state.ratedMovies]
      } else {
        return [rating, ...state.ratedMovies]
      }
    })
  },

  removeFromFavorites: (imdbID) =>
    set((state) => ({
      favoriteList: state.favoriteList.filter(
        (movie) => movie.imdbID !== imdbID
      ),
    })),
}))

export default useStore
