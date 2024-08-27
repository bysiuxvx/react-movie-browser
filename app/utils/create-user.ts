import prisma from "./prisma-client"

async function createUser(userId: string) {
  return await prisma.user.create({
    data: {
      clerkId: userId!,
    },
  })
}

export default createUser
