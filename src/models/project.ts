import { PrismaClient } from '@prisma/client'
import { getProjectPrismaQuery } from '../utils/format'

const prisma = new PrismaClient()

export const getProjectByUserId = async (user_id: number) =>
  await prisma.project.findUnique({
    where: { user_id },
    include: getProjectPrismaQuery,
  })

export const getProject = async (id: number) =>
  await prisma.project.findUnique({
    where: { id },
    include: getProjectPrismaQuery,
  })

export const createProject = async ({
  user_id,
  name,
  intro,
  description,
}: {
  user_id: number
  name: string
  intro: string
  description: string
}) =>
  await prisma.project.create({
    data: { user_id, name, intro, description },
    include: getProjectPrismaQuery,
  })

export const deleteProject = async (user_id: number) =>
  await prisma.project.delete({ where: { user_id } })
