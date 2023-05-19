import { Request, Response } from 'express'
import {
  getUser as _getUser,
  updateUser,
  createUser as _createUser,
} from 'models/user'
import {
  createPositionOnUser,
  deletePositionOnUserByUserId,
} from 'models/positions_on_users'
import {
  bundleCookieToObject,
  bundleResponseData,
  bundleResponseError,
  bundleUser,
} from 'utils/bundle'
import { errorGenerator } from 'utils/generator'
import { UserBundleType } from 'utils/type'
import {
  createExperienceOnUser,
  deleteExperienceOnUserByUserId,
} from 'models/experiences_on_users'
import {
  createWeekOnUser,
  deleteWeekOnUserByUserId,
} from 'models/weeks_on_users'
import {
  createLocationsOnUser,
  deleteLocationOnUserByUserId,
} from 'models/locations_on_users'
import {
  createMeetingSystemOnUser,
  deleteMeetingSystemOnUserByUserId,
} from 'models/meeting_systems_on_users'
import {
  createMeetingTimeOnUser,
  deleteMeetingTimeOnUserByUserId,
} from 'models/meeting_times_on_users'
import qs from 'querystring'
import { COOKEY_KEY } from 'utils/constant'

export const getMe = async (req: Request, res: Response) => {
  try {
    const params = bundleCookieToObject(req.headers.cookie as string)
    const { user_id } = qs.parse(params[COOKEY_KEY])
    const user = await _getUser(Number(user_id))
    if (!user) return
    const data: UserBundleType = bundleUser(user)
    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    const { status_code, message } = err
    errorGenerator({
      res,
      status_code,
      message,
    })
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user_id = Number(id)
    if (!user_id)
      throw bundleResponseError({ status_code: 400, message: 'KEY_ERROR' })
    const user = await _getUser(user_id)
    if (!user) return
    const data: UserBundleType = bundleUser(user)
    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    const { status_code, message } = err
    errorGenerator({
      res,
      status_code,
      message,
    })
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
    } = req.body
    const params = bundleCookieToObject(req.headers.cookie as string)
    const user_id = Number(params.user_id)
    if (!!name || !!link || !!intro) {
      await updateUser(user_id, name, link, intro)
    }
    if (!!positions) {
      await deletePositionOnUserByUserId({ user_id })
      await positions.forEach((position_id: number) =>
        createPositionOnUser({ user_id, position_id }),
      )
    }
    if (!!experiences) {
      await deleteExperienceOnUserByUserId({ user_id })
      await experiences.forEach((experience_id: number) =>
        createExperienceOnUser({ user_id, experience_id }),
      )
    }
    if (!!weeks) {
      await deleteWeekOnUserByUserId({ user_id })
      await experiences.forEach((week_id: number) =>
        createWeekOnUser({ user_id, week_id }),
      )
    }
    if (!!locations) {
      await deleteLocationOnUserByUserId({ user_id })
      await experiences.forEach((location_id: number) =>
        createLocationsOnUser({ user_id, location_id }),
      )
    }
    if (!!meeting_systems) {
      await deleteMeetingSystemOnUserByUserId({ user_id })
      await experiences.forEach((meeting_system_id: number) =>
        createMeetingSystemOnUser({ user_id, meeting_system_id }),
      )
    }
    if (!!meeting_times) {
      await deleteMeetingTimeOnUserByUserId({ user_id })
      await experiences.forEach((meeting_time_id: number) =>
        createMeetingTimeOnUser({ user_id, meeting_time_id }),
      )
    }
    const user = await _getUser(user_id)
    if (!user) return
    const data: UserBundleType = bundleUser(user)
    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    const { status_code, message } = err
    errorGenerator({
      res,
      status_code,
      message,
    })
  }
}
