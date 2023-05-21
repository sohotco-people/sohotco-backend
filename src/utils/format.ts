import qs from 'querystring'
import { bundleCookieToObject } from 'utils/bundle'
import { COOKEY_KEY } from 'utils/constant'

export const getUserIdByCookie = (cookie: string) =>
  Number(qs.parse(bundleCookieToObject(cookie)[COOKEY_KEY]).user_id)
