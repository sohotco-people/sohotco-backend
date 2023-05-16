export interface ResponseDataType {
  data: Record<string, any> | null
  statusCode?: number
  message?: string
}

export interface ResponseErrorType {
  statusCode?: number
  message?: string
}
