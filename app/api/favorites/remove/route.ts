import {NextRequest, NextResponse} from "next/server"
import {getAuth} from "@clerk/nextjs/server"
import prisma from "../../../utils/prisma-client"

export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { itemId } = await req.json()

    if (!itemId) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 })
    }

    const result = await prisma.user.upsert({
      where: { clerkId: userId },
      create: {
        clerkId: userId,
        createdAt: new Date(),
      },
      update: {},
      include: {
        favorites: {
          where: { itemId },
          take: 1
        }
      }
    })

    if (result.favorites.length === 0) {
      return NextResponse.json({ error: "Favorite not found" }, { status: 404 })
    }

    await prisma.favorite.deleteMany({
      where: {
        userId: result.id,
        itemId: itemId,
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Favorites Remove API Error:", error)
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 })
  }
}
