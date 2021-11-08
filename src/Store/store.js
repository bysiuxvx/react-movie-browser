import create from "zustand"

const useStore = create((set) => ({
  favoriteList: JSON.parse(localStorage.getItem("favoriteList") || "[]"),
  ratedMovies: JSON.parse(localStorage.getItem("ratedMovies") || "[]"),

  searchValue: "",
  movieList: [],
  modalDetails: null,

  setSearchValue: (value) => set({ searchValue: value }),
  setMovieList: (list) => set({ movieList: list }),
  setModalDetails: (details) => set({ modalDetails: details }),
  addToFavorites: (movie) => {
    set((state) => ({
      favoriteList: [movie, ...state.favoriteList],
    }))
  },

  // setUserRating: (imdbID, rating) => {
  //   set((state) => ({
  //     ratedMovies: [...state.ratedMovies, ratedMovie],
  //   }))
  // },

  removeFromFavorites: (imdbID) =>
    set((state) => ({
      favoriteList: state.favoriteList.filter(
        (movie) => movie.imdbID !== imdbID
      ),
    })),
}))

export default useStore
