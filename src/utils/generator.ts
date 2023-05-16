import { Response } from 'express'
import { bundleResponseError } from 'utils/bundle'

export const errorGenerator = ({
  res,
  statusCode = 500,
  message = 'SEVER_ERROR',
}: {
  res: Response
  statusCode: number
  message: string
}) => {
  res.status(statusCode).json(
    bundleResponseError({
      statusCode,
      message,
    }),
  )
}
