import { PrismaClient } from '@prisma/client'
import { getUserPrismaQuery } from '../utils/format'
const prisma = new PrismaClient()

export const getUserByKakaoId = async (kakao_id: string) =>
  await prisma.user.findFirst({
    where: { kakao_id, deleted_at: null },
    select: getUserPrismaQuery,
  })

export const createUser = async ({
  kakao_id,
  name,
}: {
  kakao_id: string
  name: string
}) =>
  await prisma.user.create({ data: { kakao_id, name, link: '', intro: '' } })

export const getUser = async (id: number) =>
  await prisma.user.findFirst({
    where: { id, deleted_at: null },
    select: getUserPrismaQuery,
  })

export const updateUser = async ({
  id,
  name,
  link,
  intro,
}: {
  id: number
  name: string
  link: string
  intro: string
}) =>
  await prisma.user.update({
    where: { id },
    data: { name, link, intro },
  })

export const deleteUser = async (id: number) =>
  await prisma.user.update({ where: { id }, data: { deleted_at: new Date() } })
