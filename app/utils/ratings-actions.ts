import useSWR, { mutate } from "swr"
import { Rating } from "@prisma/client"
import { useUser } from "@clerk/nextjs"

const RATINGS_URL = "/api/ratings"

const fetchRatings = async () => {
  const response = await fetch(RATINGS_URL)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export const useRatings = () => {
  const { user } = useUser()

  const { data, error } = useSWR(user ? RATINGS_URL : null, fetchRatings) as {
    data: { ratings: Rating[] }
    error: any
  }
  return {
    ratings: data?.ratings,
    isLoading: !error && !data,
    isError: error,
  }
}

export const createRating = async (
  itemId: string,
  title: string,
  itemYear: string,
  rating: number
) => {
  try {
    const response = await fetch(`${RATINGS_URL}/add`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
        rating,
        title,
        itemYear,
      }),
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    mutate(RATINGS_URL)
  } catch (error) {
    console.error("Failed to rate the media:", error)
    throw error
  }
}

export const removeRating = async (itemId: string) => {
  try {
    const response = await fetch(`${RATINGS_URL}/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    mutate(RATINGS_URL)
  } catch (error) {
    console.error("Failed to remove the rating:", error)
  }
}
