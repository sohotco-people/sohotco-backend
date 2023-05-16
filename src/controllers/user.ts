import { Request, Response } from 'express'
import {
  getUser as _getUser,
  updateUser as _updateUser,
  createPositionOnUser as _createPositionOnUser,
  deletePositionOnUserByUserId as _deletePositionOnUserByUserId,
} from 'models/user'
import { bundleResponseData, bundleResponseError } from 'utils/bundle'
import { errorGenerator } from 'utils/generator'

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user_id = Number(id)
    if (!user_id)
      throw bundleResponseError({ statusCode: 400, message: 'KEY_ERROR' })
    const user = await _getUser(user_id)
    res.status(200).json(bundleResponseData({ data: user }))
  } catch (err: any) {
    errorGenerator({
      res,
      statusCode: err.statusCode,
      message: err.message,
    })
  }
}

export const updateMe = async (req: Request, res: Response) => {
  try {
    const user_id = 1
    const { name, link, intro, positions } = req.body
    if (!!name || !!link || !!intro) {
      await _updateUser(user_id, name, link, intro)
    }
    if (!!positions) {
      await _deletePositionOnUserByUserId(user_id)
      await positions.forEach((position_id: number) =>
        _createPositionOnUser(user_id, position_id),
      )
    }
    const user = await _getUser(user_id)
    res.status(200).json(user)
  } catch (err: any) {
    errorGenerator({
      res,
      statusCode: err.statusCode,
      message: err.message,
    })
  }
}
