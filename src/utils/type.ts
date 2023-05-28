export interface ResponseDataType {
  data?: Record<string, any> | null
  status?: number
  message?: string
}

export interface ResponseErrorType {
  status?: number
  message?: string
}

export interface WithIdNameType {
  id?: number
  name: string
}

export interface UserBaseType extends WithIdNameType {
  link: string
  intro: string
}

export interface UserRequestType extends UserBaseType {
  positions: number[]
  experiences: number[]
  weeks: number[]
  locations: number[]
  meeting_systems: number[]
  meeting_times: number[]
}

export interface UserResponseType extends UserBaseType {
  positions: { position: WithIdNameType }[]
  experiences: { experience: WithIdNameType }[]
  weeks: { week: WithIdNameType }[]
  locations: { location: WithIdNameType }[]
  meeting_systems: { meeting_system: WithIdNameType }[]
  meeting_times: { meeting_time: WithIdNameType }[]
}

export interface UserBundleType extends UserBaseType {
  positions: WithIdNameType[]
  experiences: WithIdNameType[]
  weeks: WithIdNameType[]
  locations: WithIdNameType[]
  meeting_systems: WithIdNameType[]
  meeting_times: WithIdNameType[]
}

export interface ProjectBaseType extends WithIdNameType {
  user_id: number
  intro: string
  description: string
}

export interface ProjectResponseType extends ProjectBaseType {
  meeting_times: { meeting_time: WithIdNameType }[]
  meeting_systems: { meeting_system: WithIdNameType }[]
  weeks: { week: WithIdNameType }[]
  positions: { position: WithIdNameType }[]
  locations: { location: WithIdNameType }[]
}

export interface ProjectBundleType extends ProjectBaseType {
  meeting_times: WithIdNameType[]
  meeting_systems: WithIdNameType[]
  weeks: WithIdNameType[]
  positions: WithIdNameType[]
  locations: WithIdNameType[]
}

export interface ProjectRequestType extends ProjectBaseType {
  meeting_times: number[]
  meeting_systems: number[]
  weeks: number[]
  positions: number[]
  locations: number[]
}
