import qs from 'querystring'
import { SOHOTCO_OAUTH_KEY } from '../../src/utils/constant'

export const getAccessTokenByCookie = (cookie: string) =>
  qs.parse(cookie)[SOHOTCO_OAUTH_KEY] as string
