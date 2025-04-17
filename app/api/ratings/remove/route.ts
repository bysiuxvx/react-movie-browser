import {NextRequest, NextResponse} from "next/server"
import {getAuth} from "@clerk/nextjs/server"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

interface DeleteRatingRequest {
  itemId: string
}

export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { itemId } = body as DeleteRatingRequest

    if (!itemId || typeof itemId !== 'string') {
      return NextResponse.json({ error: "Invalid item ID" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const deletedRating = await prisma.$transaction(async (tx) => {
      const rating = await tx.rating.findFirst({
        where: {
          userId: user.id,
          itemId: itemId,
        },
      })

      if (!rating) {
        throw new Error("Rating not found")
      }

      return tx.rating.delete({
        where: {
          id: rating.id
        }
      })
    })

    return NextResponse.json(
      { message: "Rating removed successfully!", rating: deletedRating },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error removing rating:", error)
    
    if (error instanceof Error && error.message === "Rating not found") {
      return NextResponse.json({ error: "Rating not found" }, { status: 404 })
    }
    
    return NextResponse.json(
      { error: "Failed to remove rating" },
      { status: 500 }
    )
  }
}
