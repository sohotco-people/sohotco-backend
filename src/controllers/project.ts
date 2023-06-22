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
  updateProject as _updateProject,
  getProjects as _getProjects,
  getProjectByUserId,
  updatePublishProject,
  updateViewsProject,
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
import { createProjectProposal as _createProjectProposal } from '../models/project_proposals_on_users'

export const getMyProject = async (req: Request, res: Response) => {
  try {
    const user = await getUserByCookieAccessToken(req.headers.cookie as string)
    const project = await _getProjectByUserId(user.id)
    if (!project) throw bundleResponseError({ message: 'not exist project' })

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
    if (!project) throw bundleResponseError({ message: 'not exist project' })

    await updateViewsProject(Number(id))

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
        message: 'key error at body',
      })
    }

    const user = await getUserByCookieAccessToken(req.headers.cookie as string)

    const project_id = await _createProject({
      name,
      intro,
      description,
      user_id: user.id,
    }).then(({ id }) => id)
    if (!project_id)
      throw bundleResponseError({
        message: 'can not received project_id',
      })

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
        message: 'can not received project',
      })

    const data: ProjectBundleType = bundleProject(project)

    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}

export const deleteMyProject = async (req: Request, res: Response) => {
  try {
    const user = await getUserByCookieAccessToken(req.headers.cookie as string)

    const project = await getProjectByUserId(user.id)
    if (!project)
      throw bundleResponseError({
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

export const updateMyProject = async (req: Request, res: Response) => {
  try {
    const {
      name,
      intro,
      description,
      positions,
      weeks,
      locations,
      meeting_systems,
      meeting_times,
    }: ProjectRequestType = req.body
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
        message: 'key error at body',
      })
    }

    const user = await getUserByCookieAccessToken(req.headers.cookie as string)

    const project_id = await _updateProject({
      user_id: user.id,
      name,
      intro,
      description,
    }).then(({ id }) => id)
    if (!project_id)
      throw bundleResponseError({
        message: 'can not received project id',
      })

    await deleteWeeksOnProjects(project_id)
    await deletePositionsOnProjects(project_id)
    await deleteLocationsOnProjects(project_id)
    await deleteMeetingTimesOnProjects(project_id)
    await deleteMeetingSystemsOnProjects(project_id)

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
        message: 'can not received project',
      })

    const data: ProjectBundleType = bundleProject(project)

    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}

export const updatePublishMyProject = async (req: Request, res: Response) => {
  try {
    const { is_published } = req.body
    if (typeof is_published === undefined)
      throw bundleResponseError({ message: 'key error at body' })

    const user = await getUserByCookieAccessToken(req.headers.cookie as string)

    await updatePublishProject({ user_id: user.id, is_published })

    res.status(200).json(bundleResponseData({}))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await _getProjects()
    res.status(200).json(bundleResponseData({ data: projects }))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}

export const createProjectProposal = async (req: Request, res: Response) => {
  try {
    const respondent_id = Number(req.body.user_id)
    const respondent_name = req.body.user_name
    const project_id = Number(req.body.project_id)
    const message = req.body.message
    if (!respondent_id || !respondent_name || !project_id || !message)
      throw bundleResponseError({ message: 'key error at params' })

    const user = await getUserByCookieAccessToken(req.headers.cookie as string)

    await _createProjectProposal({
      requestor_id: user.id,
      requestor_name: user.name,
      respondent_id,
      respondent_name,
      project_id,
      message,
    })

    res.status(200).json(bundleResponseData({}))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}
