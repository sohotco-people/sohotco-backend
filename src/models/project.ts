import { PrismaClient } from '@prisma/client'
import { getProjectPrismaQuery } from '../utils/format'
import { ProjectBaseType } from '../utils/type'

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
}: ProjectBaseType) =>
  await prisma.project.create({
    data: { user_id, name, intro, description },
    select: { id: true },
  })

export const deleteProject = async (user_id: number) =>
  await prisma.project.delete({ where: { user_id } })
