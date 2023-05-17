export interface ResponseDataType {
  data: Record<string, any> | null
  statusCode?: number
  message?: string
}

export interface ResponseErrorType {
  statusCode?: number
  message?: string
}

export interface UserType {
  id: number
  name: string
  link: string
  intro: string
  positions: { position: WithIdNameType }[]
  experiences: { experience: WithIdNameType }[]
  weeks: { week: WithIdNameType }[]
  locations: { location: WithIdNameType }[]
  meeting_systems: { meeting_system: WithIdNameType }[]
  meeting_times: { meeting_time: WithIdNameType }[]
}

export interface UserBundleType {
  id: number
  name: string
  link: string
  intro: string
  positions: WithIdNameType[]
  experiences: WithIdNameType[]
  weeks: WithIdNameType[]
  locations: WithIdNameType[]
  meeting_systems: WithIdNameType[]
  meeting_times: WithIdNameType[]
}

export interface WithIdNameType {
  id: number
  name: string
}
