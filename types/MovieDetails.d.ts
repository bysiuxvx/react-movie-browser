import { SearchItemTypes } from "../../enums/SearchItemTypes"

export interface MovieDetails {
  Title: string
  Year: string
  imdbID: string
  Poster: string
  Genre: string
  Director: String
  Runtime: string
  Plot: string
  Type: SearchItemTypes
  Ratings: { Source: string; Value: string }[]
  //   Ratings: [Source: string, Value: string]
}
