import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getUser = async (id: number) =>
  await prisma.user.findUnique({
    where: { id },
    include: {
      positions: {
        select: {
          position: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      experiences: {
        select: {
          experience: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      weeks: {
        select: {
          week: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      locations: {
        select: {
          location: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      meeting_systems: {
        select: {
          meeting_system: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      meeting_times: {
        select: {
          meeting_time: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })

export const updateUser = async (
  id: number,
  name: string,
  link: string,
  intro: string,
) => {
  return await prisma.user.update({
    where: { id },
    data: { name, link, intro },
  })
}
