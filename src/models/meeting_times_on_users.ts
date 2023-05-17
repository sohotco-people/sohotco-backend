import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createMeetingTimeOnUser = async ({
  user_id,
  meeting_time_id,
}: {
  user_id: number
  meeting_time_id: number
}) => {
  return await prisma.meetingTimesOnUsers.create({
    data: {
      user_id,
      meeting_time_id,
    },
  })
}

export const deleteMeetingTimeOnUserByUserId = async ({
  user_id,
}: {
  user_id: number
}) => {
  return await prisma.meetingTimesOnUsers.deleteMany({
    where: { user_id },
  })
}
