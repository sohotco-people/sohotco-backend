import { Request, Response } from 'express'
import {
  bundleProject,
  bundleResponseData,
  bundleResponseError,
} from '../utils/bundle'
import {
  createProject as _createProject,
  deleteProject as _deleteProject,
  getProject as _getProject,
  getProjectByUserId as _getProjectByUserId,
} from '../models/project'
import { getAccessTokenByCookie } from '../utils/format'
import { getKakaoUserByToken, getUserByCookieAccessToken } from '../utils/hook'
import { getUserByKakaoId } from '../models/user'
import { ProjectBundleType } from '../utils/type'

export const getMyProject = async (req: Request, res: Response) => {
  try {
    const user = await getUserByCookieAccessToken(req.headers.cookie as string)
    const project = await _getProjectByUserId(user.id)
    if (!project)
      throw bundleResponseError({ status: 400, message: 'not exist project' })

    const data: ProjectBundleType = bundleProject(project)

    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}

export const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const project = await _getProject(Number(id))
    if (!project)
      throw bundleResponseError({ status: 400, message: 'not exist project' })

    const data: ProjectBundleType = bundleProject(project)

    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, intro, description } = req.body
    if (!name || !intro || !description)
      throw bundleResponseError({
        status: 400,
        message: 'key error name or intro or description',
      })

    const user = await getUserByCookieAccessToken(req.headers.cookie as string)

    const project = await _createProject({
      name,
      intro,
      description,
      user_id: user.id,
    })

    const data: ProjectBundleType = bundleProject(project)

    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const user = await getUserByCookieAccessToken(req.headers.cookie as string)

    await _deleteProject(user.id)

    res.status(200).json(bundleResponseData({}))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}
