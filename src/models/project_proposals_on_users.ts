import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createProposal = async ({
  user_id,
  project_id,
  message,
}: {
  user_id: number
  project_id: number
  message: string
}) =>
  await prisma.projectProposalsOnUsers.create({
    data: { user_id, project_id, message },
  })
