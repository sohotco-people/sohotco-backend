import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createExperienceOnUser = async ({
  user_id,
  experience_id,
}: {
  user_id: number
  experience_id: number
}) => {
  return await prisma.experiencesOnUsers.create({
    data: {
      user_id,
      experience_id,
    },
  })
}

export const deleteExperienceOnUserByUserId = async ({
  user_id,
}: {
  user_id: number
}) => {
  return await prisma.experiencesOnUsers.deleteMany({
    where: { user_id },
  })
}
