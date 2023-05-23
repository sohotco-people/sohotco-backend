import {
  ResponseDataType,
  ResponseErrorType,
  UserType,
  WithIdNameType,
} from '../../src/utils/type'

export const bundleResponseData = ({
  data,
  status = 200,
  message = 'success',
}: ResponseDataType) => {
  return { data, status, message }
}

export const bundleResponseError = ({
  status = 500,
  message = 'server error',
}: ResponseErrorType) => {
  return { status, message }
}

export const bundleWithIdName = ({ id, name }: WithIdNameType) => {
  return { id, name }
}

export const bundleUser = (user: UserType) => {
  return {
    ...user,
    positions: user.positions.map((item) => bundleWithIdName(item.position)),
    experiences: user.experiences.map((item) =>
      bundleWithIdName(item.experience),
    ),
    weeks: user.weeks.map((item) => bundleWithIdName(item.week)),
    locations: user.locations.map((item) => bundleWithIdName(item.location)),
    meeting_systems: user.meeting_systems.map((item) =>
      bundleWithIdName(item.meeting_system),
    ),
    meeting_times: user.meeting_times.map((item) =>
      bundleWithIdName(item.meeting_time),
    ),
  }
}

export const bundleCookieToObject = (cookies: string) => {
  let list: Record<string, string> = {}
  !!cookies &&
    cookies.split(`;`).forEach((cookie) => {
      let [name, ...rest] = cookie.split(`=`)
      name = name?.trim()
      if (!name) return
      const value = rest.join(`=`).trim()
      if (!value) return
      list[name] = decodeURIComponent(value)
    })
  return list
}
