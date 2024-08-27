import axios, { AxiosError } from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const movieId = searchParams.get("movieId")

  const API_URL: string = `https://www.omdbapi.com/?i=${movieId}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`

  try {
    const response = await axios.get(API_URL)

    if (response.data && response.data.Response === "True") {
      return NextResponse.json(response.data, { status: 200 })
    } else {
      return NextResponse.json(
        { error: "Movie not found or API returned an error" },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error("Error fetching media details:", error)

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError

      if (axiosError.response) {
        return NextResponse.json(
          { error: axiosError.response.data },
          { status: axiosError.response.status }
        )
      } else if (axiosError.request) {
        return NextResponse.json(
          { error: "No response received from the API" },
          { status: 500 }
        )
      } else {
        return NextResponse.json(
          { error: "An unknown error occurred" },
          { status: 500 }
        )
      }
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      )
    }
  }
}
