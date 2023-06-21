import { Request, Response } from 'express'
import {
  getUser as _getUser,
  getUsers as _getUsers,
  updateUser,
  createUser as _createUser,
  deleteUser,
  getMyNews as _getMyNews,
} from '../../src/models/user'
import {
  createPositionOnUser,
  deletePositionOnUserByUserId,
} from '../../src/models/positions_on_users'
import {
  bundleNews,
  bundleResponseData,
  bundleResponseError,
  bundleUser,
  bundleUsers,
} from '../../src/utils/bundle'
import {
  NewsBundleType,
  UserBundleType,
  UserRequestType,
} from '../../src/utils/type'
import {
  createExperienceOnUser,
  deleteExperienceOnUserByUserId,
} from '../../src/models/experiences_on_users'
import {
  createWeekOnUser,
  deleteWeekOnUserByUserId,
} from '../../src/models/weeks_on_users'
import {
  createLocationsOnUser,
  deleteLocationOnUserByUserId,
} from '../../src/models/locations_on_users'
import {
  createMeetingSystemOnUser,
  deleteMeetingSystemOnUserByUserId,
} from '../../src/models/meeting_systems_on_users'
import {
  createMeetingTimeOnUser,
  deleteMeetingTimeOnUserByUserId,
} from '../../src/models/meeting_times_on_users'
import { getUserByCookieAccessToken } from '../utils/hook'
import { createProposal as _createProposal } from '../models/project_proposals_on_users'

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await getUserByCookieAccessToken(req.headers.cookie as string)

    const data: UserBundleType = bundleUser(user)

    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user_id = Number(id)
    if (!user_id) throw bundleResponseError({ message: 'key error at params' })

    const user = await _getUser(user_id)
    if (!user)
      throw bundleResponseData({ status: 201, message: 'not exist user' })

    const data: UserBundleType = bundleUser(user)

    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { positions, experiences, meeting_systems, meeting_times } = req.query

    const _positions =
      typeof positions === 'string' ? [positions] : (positions as string[])
    const _experiences =
      typeof experiences === 'string'
        ? [experiences]
        : (experiences as string[])
    const _meeting_systems =
      typeof meeting_systems === 'string'
        ? [meeting_systems]
        : (meeting_systems as string[])
    const _meeting_times =
      typeof meeting_times === 'string'
        ? [meeting_times]
        : (meeting_times as string[])

    const params = {
      positions: _positions ? _positions.map(Number) : undefined,
      experiences: _experiences ? _experiences.map(Number) : undefined,
      meeting_systems: _meeting_systems
        ? _meeting_systems.map(Number)
        : undefined,
      meeting_times: _meeting_times ? _meeting_times.map(Number) : undefined,
    }

    const users = await _getUsers(params)

    const data: UserBundleType[] = bundleUsers(users)

    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}

export const updateMe = async (req: Request, res: Response) => {
  try {
    const {
      name,
      link,
      intro,
      positions,
      experiences,
      weeks,
      locations,
      meeting_systems,
      meeting_times,
    }: UserRequestType = req.body
    const _user = await getUserByCookieAccessToken(req.headers.cookie as string)

    const user_id = _user.id

    if (!!name || !!link || !!intro) {
      await updateUser({ id: user_id, name, link, intro })
    }

    if (!!positions) {
      await deletePositionOnUserByUserId({ user_id })
      for (const position_id of positions)
        await createPositionOnUser({ user_id, position_id })
    }

    if (!!experiences) {
      await deleteExperienceOnUserByUserId({ user_id })
      for (const experience_id of experiences)
        await createExperienceOnUser({ user_id, experience_id })
    }

    if (!!weeks) {
      await deleteWeekOnUserByUserId({ user_id })
      for (const week_id of weeks) await createWeekOnUser({ user_id, week_id })
    }

    if (!!locations) {
      await deleteLocationOnUserByUserId({ user_id })
      for (const location_id of locations)
        await createLocationsOnUser({ user_id, location_id })
    }

    if (!!meeting_systems) {
      await deleteMeetingSystemOnUserByUserId({ user_id })
      for (const meeting_system_id of meeting_systems)
        await createMeetingSystemOnUser({ user_id, meeting_system_id })
    }

    if (!!meeting_times) {
      await deleteMeetingTimeOnUserByUserId({ user_id })
      for (const meeting_time_id of meeting_times)
        await createMeetingTimeOnUser({ user_id, meeting_time_id })
    }

    const user = await _getUser(user_id)
    if (!user)
      throw bundleResponseData({ status: 201, message: 'no user permissions' })

    const data: UserBundleType = bundleUser(user)

    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}

export const deleteMe = async (req: Request, res: Response) => {
  try {
    const user = await getUserByCookieAccessToken(req.headers.cookie as string)

    await deleteUser(user.id)

    res.status(200).json(bundleResponseData({}))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}

export const createProposal = async (req: Request, res: Response) => {
  try {
    const user_id = Number(req.params.user_id)
    const project_id = Number(req.params.project_id)
    if (!user_id || !project_id)
      throw bundleResponseError({ message: 'key error at params' })

    const { message } = req.body
    if (!message) throw bundleResponseError({ message: 'key error at body' })

    await _createProposal({ user_id, project_id, message })

    res.status(200).json(bundleResponseData({}))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}

export const getMyNews = async (req: Request, res: Response) => {
  try {
    const user = await getUserByCookieAccessToken(req.headers.cookie as string)

    const news = await _getMyNews({
      user_id: user.id,
      project_id: user.project?.id,
    })

    const data: NewsBundleType[] = bundleNews(news)

    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}
