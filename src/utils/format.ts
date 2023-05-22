import qs from 'querystring'
import { bundleCookieToObject } from '../../src/utils/bundle'
import { COOKEY_KEY } from '../../src/utils/constant'

export const getUserIdByCookie = (cookie: string) =>
  Number(qs.parse(bundleCookieToObject(cookie)[COOKEY_KEY]).user_id)
