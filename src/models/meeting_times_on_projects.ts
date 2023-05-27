import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createMeetingTimesOnProjects = async ({
  project_id,
  meeting_time_id,
}: {
  project_id: number
  meeting_time_id: number
}) =>
  await prisma.meetingTimesOnProjects.create({
    data: { project_id, meeting_time_id },
  })

export const deleteMeetingTimesOnProjects = async ({
  project_id,
}: {
  project_id: number
}) =>
  await prisma.meetingTimesOnProjects.deleteMany({
    where: { project_id },
  })
