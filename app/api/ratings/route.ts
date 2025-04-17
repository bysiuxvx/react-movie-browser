import {NextRequest, NextResponse} from "next/server"
import {getAuth} from "@clerk/nextjs/server"
import prisma from "../../utils/prisma-client"
import createUser from "../../utils/create-user"

type RatingsResponse = {
  ratings: Array<{
    id: string
    userId: string
    itemId: string
    title: string
    itemYear: string
    rating: number
    createdAt: Date
  }> | undefined
}

type ErrorResponse = {
  error: string
}

export async function GET(req: NextRequest): Promise<NextResponse<RatingsResponse | ErrorResponse>> {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: "User ID is missing" }, { status: 400 })
  }

  try {
    let userWithRatings = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        ratings: true,
      },
    })

    if (!userWithRatings) {
      await createUser(userId)
      userWithRatings = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: {
          ratings: true,
        },
      })
    }

    return NextResponse.json(
      { ratings: userWithRatings?.ratings },
      { status: 200 }
    )
  } catch (error) {
    console.error("error: ", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    )
  }
}
