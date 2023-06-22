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
  await prisma.project.findFirst({
    where: { id, is_published: true },
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

export const updateProject = async ({
  user_id,
  name,
  intro,
  description,
}: ProjectBaseType) =>
  await prisma.project.update({
    where: { user_id },
    data: { name, intro, description, updated_at: new Date() },
    select: { id: true },
  })

export const updatePublishProject = async ({
  user_id,
  is_published,
}: {
  user_id: number
  is_published: boolean
}) =>
  await prisma.project.update({ where: { user_id }, data: { is_published } })

export const getProjects = async () =>
  await prisma.project.findMany({
    where: { is_published: true },
    select: {
      id: true,
      name: true,
      intro: true,
      views: true,
      created_at: true,
      updated_at: true,
    },
  })

export const updateViewsProject = async (id: number) =>
  await prisma.project.update({
    where: { id },
    data: { views: { increment: 1 } },
  })
