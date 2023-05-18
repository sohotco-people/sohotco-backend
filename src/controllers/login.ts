import { Request, Response } from 'express'
import { errorGenerator } from 'utils/generator'

export const oauthLogin = async (req: Request, res: Response) => {
  try {
    console.log(req)
  } catch (err: any) {
    errorGenerator({
      res,
      statusCode: err.statusCode,
      message: err.message,
    })
  }
}
