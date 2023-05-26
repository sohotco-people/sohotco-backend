import axios from 'axios'
import { Request, Response } from 'express'
import { createUser, getUserByKakaoId } from '../models/user'
import {
  KAKAO_REDIRECT_URI,
  KAKAO_REST_API_KEY,
} from '../../src/utils/constant'
import { getKakaoUserByToken } from '../utils/hook'
import { bundleResponseError } from '../utils/bundle'

export const oauthLogin = async (req: Request, res: Response) => {
  try {
    const { code, state } = req.query
    if (!code || !state)
      throw bundleResponseError({
        status: 400,
        message: 'key error state or code',
      })

    const oauth_token = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      data: {
        grant_type: 'authorization_code',
        client_id: KAKAO_REST_API_KEY,
        redirect_uri: KAKAO_REDIRECT_URI,
        code,
      },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }).then(({ data }) => data)

    const { access_token } = oauth_token
    if (!access_token)
      throw bundleResponseError({ message: 'access token error' })

    const kakao_user = await getKakaoUserByToken(access_token)
    if (!kakao_user)
      throw bundleResponseError({ message: 'get kakao user error' })

    const kakao_id = String(kakao_user.id)
    const nickname = kakao_user.properties.nickname
    if (!kakao_id || !nickname)
      throw bundleResponseError({ message: 'key error kakao_id or nickname' })

    const user = await getUserByKakaoId(kakao_id)
    if (!user) await createUser({ kakao_id, name: nickname })

    res.status(200).redirect(`${state}?access_token=${access_token}`)
  } catch (err: any) {
    res.status(err.status || 500).json(err)
  }
}
