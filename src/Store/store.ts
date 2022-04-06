import create from "zustand"
import { MovieDetails } from "../types/MovieDetails"

export interface MovieBrowserStoreState {
  favoriteList: MovieDetails[]
  ratedMovies: Record<string, number>
  searchValue: string
  sidebarVisible: boolean
  movieList: MovieDetails[]
  modalDetails: MovieDetails | null

  setSearchValue: (value: string) => void
  setMovieList: (list: any[]) => void
  setModalDetails: (details: MovieDetails | null) => void
  setSidebarVisible: (value: boolean) => void
  addUserRating: (rating: Record<string, number>) => void
  addToFavorites: (movie: MovieDetails) => void
  removeFromFavorites: (imdbID: string) => void
}

const storageFavorites = JSON.parse(
  localStorage.getItem("favoriteList") || "[]"
)
const storageRatesMovies = JSON.parse(
  localStorage.getItem("ratedMovies") || "{}"
)

const useStore = create<MovieBrowserStoreState>((set) => ({
  favoriteList: storageFavorites,
  ratedMovies: storageRatesMovies,
  searchValue: "",
  sidebarVisible: false,
  movieList: [],
  modalDetails: null,

  setSearchValue: (value: string) => set({ searchValue: value }),
  setMovieList: (list: any[]) => set({ movieList: list }),
  setModalDetails: (details: MovieDetails | null) =>
    set({ modalDetails: details }),
  setSidebarVisible: (value: boolean) => set({ sidebarVisible: value }),

  addUserRating: (rating: Record<string, number>) => {
    set({ ratedMovies: rating })
  },

  addToFavorites: (movie: MovieDetails) => {
    set((state: MovieBrowserStoreState) => ({
      favoriteList: [movie, ...state.favoriteList],
    }))
  },

  removeFromFavorites: (imdbID: string) =>
    set((state: MovieBrowserStoreState) => ({
      favoriteList: state.favoriteList.filter(
        (movie) => movie.imdbID !== imdbID
      ),
    })),
}))

export default useStore
