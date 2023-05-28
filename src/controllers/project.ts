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
  getProjectByUserId,
} from '../models/project'
import { getUserByCookieAccessToken } from '../utils/hook'
import { ProjectBundleType, ProjectRequestType } from '../utils/type'
import {
  createMeetingTimesOnProjects,
  deleteMeetingTimesOnProjects,
} from '../models/meeting_times_on_projects'
import {
  createMeetingSystemsOnProjects,
  deleteMeetingSystemsOnProjects,
} from '../models/meeting_systems_on_projects'
import {
  createWeeksOnProjects,
  deleteWeeksOnProjects,
} from '../models/weeks_on_projects'
import {
  createLocationsOnProjects,
  deleteLocationsOnProjects,
} from '../models/locations_on_projects'
import {
  createPositionsOnProjects,
  deletePositionsOnProjects,
} from '../models/positions_on_projects'

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
    const {
      name,
      intro,
      description,
      meeting_times,
      meeting_systems,
      weeks,
      positions,
      locations,
    }: ProjectRequestType = req.body
    const user = await getUserByCookieAccessToken(req.headers.cookie as string)

    if (
      !name ||
      !intro ||
      !description ||
      !meeting_times ||
      !meeting_systems ||
      !weeks ||
      !locations ||
      !positions
    ) {
      throw bundleResponseError({
        status: 400,
        message: 'request body key error',
      })
    }

    const project_id = await _createProject({
      name,
      intro,
      description,
      user_id: user.id,
    }).then(({ id }) => id)
    if (!project_id)
      throw bundleResponseError({ status: 500, message: 'project not created' })

    for (const meeting_time_id of meeting_times)
      await createMeetingTimesOnProjects({ meeting_time_id, project_id })
    for (const meeting_system_id of meeting_systems)
      await createMeetingSystemsOnProjects({ meeting_system_id, project_id })
    for (const week_id of weeks)
      await createWeeksOnProjects({ week_id, project_id })
    for (const location_id of locations)
      await createLocationsOnProjects({ location_id, project_id })
    for (const position_id of positions)
      await createPositionsOnProjects({ position_id, project_id })

    const project = await _getProject(project_id)
    if (!project)
      throw bundleResponseError({
        status: 500,
        message: 'project not created',
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

    const project = await getProjectByUserId(user.id)
    if (!project)
      throw bundleResponseError({
        status: 500,
        message: 'no projects to delete',
      })

    await deleteWeeksOnProjects(project.id)
    await deletePositionsOnProjects(project.id)
    await deleteLocationsOnProjects(project.id)
    await deleteMeetingTimesOnProjects(project.id)
    await deleteMeetingSystemsOnProjects(project.id)
    await _deleteProject(user.id)

    res.status(200).json(bundleResponseData({}))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}
