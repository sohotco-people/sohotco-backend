import { ResponseDataType, ResponseErrorType } from 'utils/type'

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
