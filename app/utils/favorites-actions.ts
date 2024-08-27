import useSWR, { mutate } from "swr"
import axios from "axios"
import { MediaDetails } from "../../models/MediaDetails"

import { Favorite } from "@prisma/client"

const FAVORITES_URL = "/api/favorites"

const fetchFavorites = () => axios.get(FAVORITES_URL).then((res) => res.data)

export const useFavorites = () => {
  const { data, error } = useSWR(FAVORITES_URL, fetchFavorites) as {
    data: { favorites: Favorite[] }
    error: any
  }
  return {
    favorites: data?.favorites,
    isLoading: !error && !data,
    isError: error,
  }
}

export const addToFavorites = async (media: MediaDetails) => {
  try {
    await axios.post(`${FAVORITES_URL}/add`, {
      itemId: media.imdbID,
      itemName: media.Title,
      itemYear: media.Year,
    })
    mutate(FAVORITES_URL)
  } catch (error) {
    console.error("Failed to add to favorites:", error)
    throw error
  }
}

export const removeFavorite = async (itemId: string) => {
  try {
    await axios.delete(`${FAVORITES_URL}/remove`, {
      data: { itemId },
    })
    mutate(FAVORITES_URL)
  } catch (error) {
    console.error("Failed to remove from favorites:", error)
  }
}
