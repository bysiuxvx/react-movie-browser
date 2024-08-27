import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import prisma from "../../utils/prisma-client"
import createUser from "../../utils/create-user"

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: "User ID is missing" }, { status: 400 })
  }

  try {
    let user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    })

    if (!user) {
      user = await createUser(userId)
    }

    const userWithFavorites = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        favorites: {},
      },
    })

    return NextResponse.json(
      { favorites: userWithFavorites?.favorites },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("error: ", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
