import axios from 'axios'

export const getKakaoUserByToken = async (access_token: string) =>
  await axios({
    method: 'post',
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  }).then(({ data }) => data)
