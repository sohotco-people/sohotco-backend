import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createMeetingSystemOnUser = async ({
  user_id,
  meeting_system_id,
}: {
  user_id: number
  meeting_system_id: number
}) => {
  return await prisma.meetingSystemsOnUsers.create({
    data: {
      user_id,
      meeting_system_id,
    },
  })
}

export const deleteMeetingSystemOnUserByUserId = async ({
  user_id,
}: {
  user_id: number
}) => {
  return await prisma.meetingSystemsOnUsers.deleteMany({
    where: { user_id },
  })
}
