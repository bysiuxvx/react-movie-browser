import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import prisma from "../../utils/prisma-client"

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const userWithFavorites = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: {
        clerkId: userId,
        createdAt: new Date(),
      },
      include: {
        favorites: true,
      },
    })

    return NextResponse.json({ 
      favorites: userWithFavorites.favorites 
    }, { status: 200 })

  } catch (error) {
    console.error("Favorites API Error:", error)
    return NextResponse.json({ 
      error: "Failed to fetch favorites" 
    }, { status: 500 })
  }
}
