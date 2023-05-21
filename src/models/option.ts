import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getWeeks = async () =>
  await prisma.week.findMany({ select: { id: true, name: true } })

export const getPositions = async () =>
  await prisma.position.findMany({ select: { id: true, name: true } })

export const getLocations = async () =>
  await prisma.location.findMany({ select: { id: true, name: true } })

export const getExperiences = async () =>
  await prisma.experience.findMany({ select: { id: true, name: true } })

export const getMeetingTimes = async () =>
  await prisma.meetingTime.findMany({ select: { id: true, name: true } })

export const getMeetingSystems = async () =>
  await prisma.meetingSystem.findMany({ select: { id: true, name: true } })
