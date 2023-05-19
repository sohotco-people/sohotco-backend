import axios from 'axios'
import { Request, Response } from 'express'
import { createUser, getUserByKakaoId } from 'models/user'
import moment from 'moment'
import { bundleResponseError } from 'utils/bundle'
import {
  CLIENT_BASE_URL,
  COOKEY_KEY,
  KAKAO_REDIRECT_URI,
  KAKAO_REST_API_KEY,
} from 'utils/constant'
import { errorGenerator } from 'utils/generator'

export const oauthLogin = async (req: Request, res: Response) => {
  try {
    const { code } = req.query
    if (!code)
      throw bundleResponseError({ status_code: 400, message: 'KEY_ERROR' })
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
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const { access_token } = oauth_token.data
    if (!access_token) throw bundleResponseError({ message: 'TOKEN_ERROR' })
    const kakao_user = await axios({
      method: 'post',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const kakao_id = String(kakao_user.data.id)
    const nickname = kakao_user.data.properties.nickname
    const user_by_kakao_id = await getUserByKakaoId(kakao_id)
    let user_id = 0
    if (user_by_kakao_id.length > 0) {
      user_id = user_by_kakao_id[0].id
    } else {
      const created_user = await createUser({ kakao_id, name: nickname })
      user_id = created_user.id
    }
    res.cookie(COOKEY_KEY, `user_id=${user_id}`, {
      expires: new Date(moment().add(1, 'M').format('YYYY-MM-DD HH:ss')),
      httpOnly: true,
    })
    res.status(200).redirect(CLIENT_BASE_URL)
  } catch (err: any) {
    const { status_code, message } = err
    errorGenerator({
      res,
      status_code,
      message,
    })
  }
}
