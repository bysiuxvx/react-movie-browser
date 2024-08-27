import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const searchValue = searchParams.get("query")
  const API_URL: string = `https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`

  try {
    const response = await axios.get(API_URL)

    if (response.data && response.data.Response === "True") {
      return NextResponse.json(response.data, { status: 200 })
    } else {
      return NextResponse.json(
        { error: "Media not found or API returned an error" },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error("Error fetching media details:", error)

    if (error.response) {
      return NextResponse.json(
        { error: error.response.data },
        { status: error.response.status }
      )
    } else if (error.request) {
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
  }
}
