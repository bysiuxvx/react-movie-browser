import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const searchValue = searchParams.get("query")
  const API_URL: string = `https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`

  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    if (data && data.Response === "True") {
      return NextResponse.json(data, { status: 200 })
    } else {
      return NextResponse.json(
        { error: "Media not found or API returned an error" },
        { status: 404 }
      )
    }
  } catch (error: any) {
    console.error("Error fetching media details:", error)

    if (error instanceof Error) {
      if (error.message.includes("HTTP error")) {
        return NextResponse.json(
          { error: "Failed to fetch data from the API" },
          { status: 500 }
        )
      }
      return NextResponse.json(
        { error: error.message || "An unexpected error occurred" },
        { status: 500 }
      )
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      )
    }
  }
}
