import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createMeetingSystemsOnProjects = async ({
  project_id,
  meeting_system_id,
}: {
  project_id: number
  meeting_system_id: number
}) =>
  await prisma.meetingSystemsOnProjects.create({
    data: { project_id, meeting_system_id },
  })

export const deleteMeetingSystemsOnProjects = async (project_id: number) =>
  await prisma.meetingSystemsOnProjects.deleteMany({
    where: { project_id },
  })
