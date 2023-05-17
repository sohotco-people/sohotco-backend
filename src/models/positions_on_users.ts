import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createPositionOnUser = async ({
  user_id,
  position_id,
}: {
  user_id: number
  position_id: number
}) => {
  return await prisma.positionsOnUsers.create({
    data: {
      user_id,
      position_id,
    },
  })
}

export const deletePositionOnUserByUserId = async ({
  user_id,
}: {
  user_id: number
}) => {
  return await prisma.positionsOnUsers.deleteMany({
    where: { user_id },
  })
}
