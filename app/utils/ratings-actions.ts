import useSWR, { mutate } from "swr"
import axios from "axios"
import { MediaDetails } from "../../models/MediaDetails"

import { Rating } from "@prisma/client"

const RATINGS_URL = "/api/ratings"

const fetchRatings = () => axios.get(RATINGS_URL).then((res) => res.data)

export const useRatings = () => {
  const { data, error } = useSWR(RATINGS_URL, fetchRatings) as {
    data: { ratings: Rating[] }
    error: any
  }
  return {
    ratings: data?.ratings,
    isLoading: !error && !data,
    isError: error,
  }
}

export const createRating = async (itemId: string, rating: number) => {
  try {
    await axios.put(`${RATINGS_URL}/add`, {
      itemId,
      rating,
    })
    mutate(RATINGS_URL)
  } catch (error) {
    console.error("Failed to rate the media:", error)
    throw error
  }
}

export const removeRating = async (itemId: string) => {
  try {
    await axios.delete(`${RATINGS_URL}/remove`, {
      data: { itemId },
    })
    mutate(RATINGS_URL)
  } catch (error) {
    console.error("Failed to remove the rating:", error)
  }
}
