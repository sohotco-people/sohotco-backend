import qs from 'querystring'
import { SOHOTCO_OAUTH_KEY } from '../../src/utils/constant'

export const getAccessTokenByCookie = (cookie: string) =>
  qs.parse(
    cookie.split('; ').filter((item) => item.includes(SOHOTCO_OAUTH_KEY))[0],
  )[SOHOTCO_OAUTH_KEY] as string

export const getUserPrismaQuery = {
  id: true,
  name: true,
  link: true,
  intro: true,
  kakao_id: false,
  positions: {
    select: {
      position: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  experiences: {
    select: {
      experience: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  weeks: {
    select: {
      week: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  locations: {
    select: {
      location: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  meeting_systems: {
    select: {
      meeting_system: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  meeting_times: {
    select: {
      meeting_time: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
}

export const getProjectPrismaQuery = {
  positions: {
    select: {
      position: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  weeks: {
    select: {
      week: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  locations: {
    select: {
      location: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  meeting_systems: {
    select: {
      meeting_system: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  meeting_times: {
    select: {
      meeting_time: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
}
