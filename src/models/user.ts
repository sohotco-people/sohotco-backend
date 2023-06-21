import { PrismaClient } from '@prisma/client'
import { getUserPrismaQuery } from '../utils/format'
import { UserBaseType } from '../utils/type'
const prisma = new PrismaClient()

export const getUsers = async ({
  positions,
  experiences,
  meeting_systems,
  meeting_times,
}: {
  positions?: number[]
  experiences?: number[]
  meeting_systems?: number[]
  meeting_times?: number[]
}) => {
  const query = {
    positions: { some: { position_id: positions ? { in: positions } : {} } },
    experiences: {
      some: { experience_id: experiences ? { in: experiences } : {} },
    },
    meeting_systems: {
      some: {
        meeting_system_id: meeting_systems ? { in: meeting_systems } : {},
      },
    },
    meeting_times: {
      some: { meeting_time_id: meeting_times ? { in: meeting_times } : {} },
    },
  }

  return await prisma.user.findMany({
    where: query,
    select: getUserPrismaQuery,
  })
}

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

export const updateUser = async ({ id, name, link, intro }: UserBaseType) =>
  await prisma.user.update({
    where: { id },
    data: { name, link, intro },
  })

export const deleteUser = async (id: number) =>
  await prisma.user.update({ where: { id }, data: { deleted_at: new Date() } })

export const getMyNews = async ({
  user_id,
  project_id,
}: {
  user_id: number
  project_id?: number
}) =>
  await prisma.user.findMany({
    where: {
      project_proposals: {
        some: {
          OR: [{ user_id }, { project_id }],
        },
      },
    },
    select: {
      project_proposals: {
        select: {
          user: { select: { id: true, name: true } },
          project: { select: { id: true, name: true } },
        },
      },
    },
  })
