import useSWR, { mutate } from "swr"
import { MediaDetails } from "../../models/MediaDetails"
import { Favorite } from "@prisma/client"

const FAVORITES_URL = "/api/favorites"

// Function to fetch favorites using Fetch API
const fetchFavorites = async () => {
  const response = await fetch(FAVORITES_URL)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

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

// Function to add to favorites using Fetch API
export const addToFavorites = async (media: MediaDetails) => {
  try {
    const response = await fetch(`${FAVORITES_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId: media.imdbID,
        itemName: media.Title,
        itemYear: media.Year,
      }),
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    mutate(FAVORITES_URL)
  } catch (error) {
    console.error("Failed to add to favorites:", error)
    throw error
  }
}

// Function to remove from favorites using Fetch API
export const removeFavorite = async (itemId: string) => {
  try {
    const response = await fetch(`${FAVORITES_URL}/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    mutate(FAVORITES_URL)
  } catch (error) {
    console.error("Failed to remove from favorites:", error)
  }
}
