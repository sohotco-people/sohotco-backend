import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createLocationsOnUser = async ({
  user_id,
  location_id,
}: {
  user_id: number
  location_id: number
}) => {
  return await prisma.locationsOnUsers.create({
    data: {
      user_id,
      location_id,
    },
  })
}

export const deleteLocationOnUserByUserId = async ({
  user_id,
}: {
  user_id: number
}) => {
  return await prisma.locationsOnUsers.deleteMany({
    where: { user_id },
  })
}
