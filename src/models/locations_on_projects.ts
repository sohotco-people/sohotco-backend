import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createLocationsOnProjects = async ({
  project_id,
  location_id,
}: {
  project_id: number
  location_id: number
}) =>
  await prisma.locationsOnProjects.create({
    data: { project_id, location_id },
  })

export const deleteLocationsOnProjects = async (project_id: number) =>
  await prisma.locationsOnProjects.deleteMany({
    where: { project_id },
  })
