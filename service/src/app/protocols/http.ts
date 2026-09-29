export interface HttpRequest<T = unknown, K = unknown, Y = unknown, J = unknown, L = unknown>{
    body: T
    params: K
    query: Y
    headers: J
    context?: {
        user?: unknown
        [key: string]: unknown
    }
    cookies?: L
}

export interface HttpResponse<T = unknown> {
    statusCode: HttpResponse.StatusCode
    body?: HttpResponse.Body<T>
    cookies?: HttpResponse.Cookies[]
}

export namespace HttpResponse {
    export type StatusCode = HttpResponseCode
    export type Body<T = unknown> = T
    export type Cookies = {
        name: string
        content: string,
        options?: Record<string, unknown>
    }
}

export enum HttpResponseCode {
    SUCCESS = 200,
    SUCCESS_CREATED = 201,
    SUCCESS_NO_CONTENT = 204,
    ERROR_BAD_REQUEST = 400,
    ERROR_UNAUTHORIZED = 401,
    ERROR_NOT_FOUND = 404,
    ERROR_UNKNOWN = 500,
    ERROR_CONFLICT = 409,
    ERROR_FORBBIDEN = 403
}