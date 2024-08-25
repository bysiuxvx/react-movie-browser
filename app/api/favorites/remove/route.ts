import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: "User ID is missing" }, { status: 400 })
  }

  try {
    const { itemId } = await req.json()

    if (!itemId) {
      return NextResponse.json({ error: "Item ID is missing" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const deletedFavorite = await prisma.favorite.deleteMany({
      where: {
        userId: user.id,
        itemId: itemId,
      },
    })

    if (deletedFavorite.count === 0) {
      return NextResponse.json({ error: "Favorite not found" }, { status: 404 })
    }

    return NextResponse.json(
      { message: "Favorite removed successfully!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error removing favorite: ", error)
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    )
  }
}
