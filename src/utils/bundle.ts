import {
  ResponseDataType,
  ResponseErrorType,
  UserType,
  WithIdNameType,
} from 'utils/type'

export const bundleResponseData = ({
  data,
  statusCode = 200,
  message = 'SUCCESS',
}: ResponseDataType) => {
  return { data, statusCode, message }
}

export const bundleResponseError = ({
  statusCode = 500,
  message = 'SEVER_ERROR',
}: ResponseErrorType) => {
  return { statusCode, message }
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
