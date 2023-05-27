export interface ResponseDataType {
  data?: Record<string, any> | null
  status?: number
  message?: string
}

export interface ResponseErrorType {
  status?: number
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

export interface ProjectType {
  id: number
  user_id: number
  name: string
  intro: string
  description: string
  meeting_times: { meeting_time: WithIdNameType }[]
  meeting_systems: { meeting_system: WithIdNameType }[]
  weeks: { week: WithIdNameType }[]
  positions: { position: WithIdNameType }[]
  locations: { location: WithIdNameType }[]
}

export interface ProjectBundleType {
  id: number
  user_id: number
  name: string
  intro: string
  description: string
  meeting_times: WithIdNameType[]
  meeting_systems: WithIdNameType[]
  weeks: WithIdNameType[]
  positions: WithIdNameType[]
  locations: WithIdNameType[]
}

export interface WithIdNameType {
  id: number
  name: string
}
