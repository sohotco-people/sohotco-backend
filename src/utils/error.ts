import { Response } from 'express'
import { bundleResponseError } from '../../src/utils/bundle'

export const errorGenerator = ({
  res,
  status_code = 500,
  message = 'server error',
}: {
  res: Response
  status_code: number
  message: string
}) => {
  res.status(status_code).json(
    bundleResponseError({
      status_code,
      message,
    }),
  )
}
