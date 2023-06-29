import { Request, Response } from 'express'
import {
  getProjectProposal,
  getProjectProposalByUserId,
} from '../models/project_proposals_on_users'
import { bundleResponseData, bundleResponseError } from '../utils/bundle'
import { getUserByCookieAccessToken } from '../utils/hook'

// TODO: 내 프로젝트 없을 때 정보 확인해야됨
export const getMyNews = async (req: Request, res: Response) => {
  try {
    const user = await getUserByCookieAccessToken(req.headers.cookie as string)

    const news = await getProjectProposalByUserId(user.id)

    res.status(200).json(bundleResponseData({ data: news }))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}

export const getNews = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    if (!id) throw bundleResponseError({ message: 'key error at params' })

    const news = await getProjectProposal(id)

    res.status(200).json(bundleResponseData({ data: news }))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}
