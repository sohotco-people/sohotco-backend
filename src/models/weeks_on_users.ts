import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createWeekOnUser = async ({
  user_id,
  week_id,
}: {
  user_id: number
  week_id: number
}) => {
  return await prisma.weeksOnUsers.create({
    data: {
      user_id,
      week_id,
    },
  })
}

export const deleteWeekOnUserByUserId = async ({
  user_id,
}: {
  user_id: number
}) => {
  return await prisma.weeksOnUsers.deleteMany({
    where: { user_id },
  })
}
