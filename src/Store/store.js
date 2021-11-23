import create from "zustand"

const useStore = create((set) => ({
  favoriteList: JSON.parse(localStorage.getItem("favoriteList") || "[]"),
  ratedMovies: JSON.parse(localStorage.getItem("ratedMovies") || "{}"),

  searchValue: "",
  sidebarVisible: false,
  movieList: [],
  modalDetails: null,

  setSearchValue: (value) => set({ searchValue: value }),
  setMovieList: (list) => set({ movieList: list }),
  setModalDetails: (details) => set({ modalDetails: details }),
  setSidebarVisible: (value) => set({ sidebarVisible: value }),

  addUserRating: (rating) => {
    set({ ratedMovies: rating })
  },

  addToFavorites: (movie) => {
    set((state) => ({
      favoriteList: [movie, ...state.favoriteList],
    }))
  },

  removeFromFavorites: (imdbID) =>
    set((state) => ({
      favoriteList: state.favoriteList.filter(
        (movie) => movie.imdbID !== imdbID
      ),
    })),
}))

export default useStore
