import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"
import createUser from "../../../utils/create-user"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: "User ID is missing" }, { status: 400 })
  }

  try {
    const { itemId, itemName, itemYear } = await req.json()

    let user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    })

    if (!user) {
      user = await createUser(userId)
    }

    const favorite = await prisma.favorite.create({
      data: {
        itemId,
        itemName,
        itemYear,
        userId: user.id,
      },
    })

    return NextResponse.json(
      { message: "Favorite added successfully!", favorite },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error adding favorite: ", error)
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    )
  }
}
