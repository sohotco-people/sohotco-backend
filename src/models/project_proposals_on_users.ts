import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createProjectProposal = async ({
  requestor_id,
  requestor_name,
  respondent_id,
  respondent_name,
  project_id,
  message,
}: {
  requestor_id: number
  requestor_name: string
  respondent_id: number
  respondent_name: string
  project_id: number
  message: string
}) =>
  await prisma.projectProposalsOnUsers.create({
    data: {
      requestor_id,
      requestor_name,
      respondent_id,
      respondent_name,
      project_id,
      message,
    },
  })

export const getProjectProposal = async (id: number) =>
  await prisma.projectProposalsOnUsers.findMany({
    where: { OR: [{ requestor_id: id }, { respondent_id: id }] },
  })
