// extend the request & response type
export declare global {
  namespace Express {
    interface Request {
      userId: string,
      userAgent: string,
      redirect: boolean
    }

    interface Response {
      content: ApiResponse,
      logMessage: string
    }
  }
}

// discriminate api response
interface RawResponse {
  status: string,
  code: number
}

type SuccessResponse = RawResponse & {
  status: 'success',
  data: any,
  metadata?: any
}

type ErrorResponse = RawResponse & {
  status: 'error',
  message: string
}

type RedirectResponse = RawResponse & {
  status: 'redirect'
  to: string
}

type EmptyResponse = RawResponse & {
  status: 'empty'
}

export type ApiResponse = SuccessResponse
  | ErrorResponse
  | RedirectResponse
  | EmptyResponse