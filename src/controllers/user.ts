import { Request, Response } from 'express'
import {
  getUser as _getUser,
  updateUser,
  createUser as _createUser,
  getUserByKakaoId,
  deleteUser,
} from '../../src/models/user'
import {
  createPositionOnUser,
  deletePositionOnUserByUserId,
} from '../../src/models/positions_on_users'
import { bundleResponseData, bundleUser } from '../../src/utils/bundle'
import { UserBundleType } from '../../src/utils/type'
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
import { getAccessTokenByCookie } from '../../src/utils/format'
import { getKakaoUserByToken } from '../utils/hook'

export const getMe = async (req: Request, res: Response) => {
  try {
    const access_token = getAccessTokenByCookie(req.headers.cookie as string)
    if (!access_token)
      return res.status(201).json(bundleResponseData({ data: null }))
    const kakao_user = await getKakaoUserByToken(access_token)
    if (!kakao_user) throw 'get kakao user error'
    const kakao_id = String(kakao_user.id)
    if (!kakao_id) throw 'key error kakao_id'
    const user = await getUserByKakaoId(kakao_id)
    if (!user) return res.status(201).json(bundleResponseData({ data: null }))
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
    if (!user_id) throw 'key error user_id'
    const user = await _getUser(user_id)
    if (!user) return res.status(200).json(bundleResponseData({}))
    const data: UserBundleType = bundleUser(user)
    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    res.status(err.status).json(err)
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
    const access_token = getAccessTokenByCookie(req.headers.cookie as string)
    if (!access_token) return res.status(201).json(bundleResponseData({}))
    const kakao_user = await getKakaoUserByToken(access_token)
    const kakao_id = String(kakao_user.id)
    if (!kakao_id) throw 'key error kakao_id'
    const _user = await getUserByKakaoId(kakao_id)
    if (!_user) return res.status(200).json(bundleResponseData({}))
    const user_id = _user.id

    if (!!name || !!link || !!intro) {
      await updateUser({ id: user_id, name, link, intro })
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
      await weeks.forEach((week_id: number) =>
        createWeekOnUser({ user_id, week_id }),
      )
    }
    if (!!locations) {
      await deleteLocationOnUserByUserId({ user_id })
      await locations.forEach((location_id: number) =>
        createLocationsOnUser({ user_id, location_id }),
      )
    }
    if (!!meeting_systems) {
      await deleteMeetingSystemOnUserByUserId({ user_id })
      await meeting_systems.forEach((meeting_system_id: number) =>
        createMeetingSystemOnUser({ user_id, meeting_system_id }),
      )
    }
    if (!!meeting_times) {
      await deleteMeetingTimeOnUserByUserId({ user_id })
      await meeting_times.forEach((meeting_time_id: number) =>
        createMeetingTimeOnUser({ user_id, meeting_time_id }),
      )
    }
    const user = await _getUser(user_id)
    if (!user) return
    const data: UserBundleType = bundleUser(user)
    res.status(200).json(bundleResponseData({ data }))
  } catch (err: any) {
    res.status(err.status).json(err)
  }
}

export const deleteMe = async (req: Request, res: Response) => {
  try {
    const access_token = getAccessTokenByCookie(req.headers.cookie as string)
    if (!access_token) return res.status(201).json(bundleResponseData({}))
    const kakao_user = await getKakaoUserByToken(access_token)
    const kakao_id = String(kakao_user.id)
    if (!kakao_id) throw 'key error kakao_id'
    const user = await getUserByKakaoId(kakao_id)
    if (!user) return res.status(200).json(bundleResponseData({}))
    await deleteUser(user.id)
    res.status(200).json(bundleResponseData({}))
  } catch (err: any) {
    res.status(err.status).json(err)
  }
}
