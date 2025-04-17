import prisma from "./prisma-client"

async function createUser(userId: string) {
  return prisma.user.create({
    data: {
      clerkId: userId!,
    },
  });
}

export default createUser
