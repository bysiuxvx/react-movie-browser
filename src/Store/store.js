import create from "zustand"

const useStore = create((set) => ({
  favoriteList: JSON.parse(localStorage.getItem("favoriteList") || "[]"),

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
  // setRating: (imdbID) => {
  //   set((state) => ({
  //     favoriteList: state.favoriteList.filter(movie) => movie.,
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
