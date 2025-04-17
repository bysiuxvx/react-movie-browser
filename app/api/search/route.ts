import {NextRequest, NextResponse} from "next/server"

const OMDB_BASE_URL = "https://www.omdbapi.com"

if (!process.env.NEXT_PUBLIC_API_KEY) {
  throw new Error("NEXT_PUBLIC_API_KEY is not defined in environment variables")
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const searchValue = searchParams.get("query")

  if (!searchValue || searchValue.trim().length === 0) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 }
    )
  }

  const sanitizedSearch: string = encodeURIComponent(searchValue.trim())
  
  const API_URL = `${OMDB_BASE_URL}/?s=${sanitizedSearch}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`

  try {
    const response: Response = await fetch(API_URL, {
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    if (data && data.Response === "True") {
      return NextResponse.json(data, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
        }
      })
    }

    return NextResponse.json(
      { error: data.Error || "Media not found" },
      { status: 404 }
    )
    
  } catch (error) {
    console.error("Error fetching media details:", error)

    if (error instanceof Error) {
      if (error.message.includes("HTTP error")) {
        return NextResponse.json(
          { error: "Failed to fetch data from the API" },
          { status: 503 }
        )
      }
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
