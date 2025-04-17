import {NextRequest, NextResponse} from "next/server"
import {getAuth} from "@clerk/nextjs/server"
import prisma from "../../../utils/prisma-client"
import {z} from "zod"

const favoriteSchema = z.object({
  itemId: z.string(),
  itemName: z.string(),
  itemYear: z.string(),
})

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const validatedData = favoriteSchema.parse(body)

    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: {
        clerkId: userId,
        createdAt: new Date(),
      },
    })

    const favorite = await prisma.favorite.create({
      data: {
        ...validatedData,
        userId: user.id,
      },
    })

    return NextResponse.json({ favorite }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: "Invalid request data",
        details: error.errors 
      }, { status: 400 })
    }

    console.error("Favorites API Error:", error)
    return NextResponse.json({ 
      error: "Failed to add favorite" 
    }, { status: 500 })
  }
}
