import axios from 'axios'
import { getAccessTokenByCookie } from './format'
import { bundleResponseData, bundleResponseError } from './bundle'
import { getUserByKakaoId } from '../models/user'

export const getKakaoUserByToken = async (access_token: string) =>
  await axios({
    method: 'post',
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  }).then(({ data }) => data)

export const getUserByCookieAccessToken = async (cookie: string) => {
  const access_token = getAccessTokenByCookie(cookie)
  if (!access_token)
    throw bundleResponseData({ status: 201, message: 'no user permissions' })

  const kakao_user = await getKakaoUserByToken(access_token)
  if (!kakao_user)
    throw bundleResponseError({ message: 'get kakao user error' })

  const kakao_id = String(kakao_user.id)
  if (!kakao_id) throw bundleResponseError({ message: 'key error at body' })

  const user = await getUserByKakaoId(kakao_id)
  if (!user)
    throw bundleResponseData({ status: 201, message: 'no user permissions' })

  return user
}
