import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createWeeksOnProjects = async ({
  project_id,
  week_id,
}: {
  project_id: number
  week_id: number
}) =>
  await prisma.weeksOnProjects.create({
    data: { project_id, week_id },
  })

export const deleteWeeksOnProjects = async (project_id: number) =>
  await prisma.weeksOnProjects.deleteMany({
    where: { project_id },
  })
