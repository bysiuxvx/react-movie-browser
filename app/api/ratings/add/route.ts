import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"
import createUser from "../../../utils/create-user"

const prisma = new PrismaClient()

export async function PUT(req: NextRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: "User ID is missing" }, { status: 400 })
  }

  try {
    const { itemId, rating } = await req.json()

    let user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    })

    if (!user) {
      console.log("User not found. Creating new user...")
      user = await createUser(userId)
      console.log("New user created:", user)
    }

    // Ensure user exists
    if (!user.id) {
      return NextResponse.json(
        { error: "Failed to create or find user." },
        { status: 500 }
      )
    }

    const existingRating = await prisma.rating.findUnique({
      where: {
        userId_itemId: {
          userId: user.id,
          itemId,
        },
      },
    })

    let result

    if (existingRating) {
      result = await prisma.rating.update({
        where: {
          id: existingRating.id,
        },
        data: {
          rating,
        },
      })
    } else {
      result = await prisma.rating.create({
        data: {
          userId: user.id,
          itemId,
          rating,
        },
      })
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error("Error in PUT handler:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
