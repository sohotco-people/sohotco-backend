import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createPositionsOnProjects = async ({
  project_id,
  position_id,
}: {
  project_id: number
  position_id: number
}) =>
  await prisma.positionsOnProjects.create({
    data: { project_id, position_id },
  })

export const deletePositionsOnProjects = async (project_id: number) =>
  await prisma.positionsOnProjects.deleteMany({
    where: { project_id },
  })
