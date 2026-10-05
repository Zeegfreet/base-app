export type ApiErrorCode =
  | "UNKNOWN_ERROR" | "VALIDATION_ERROR" | "CONFLICT_ERROR" | "NOT_FOUND_ERROR"
  | "USER_BLOCKED_ERROR" | "USER_DISABLED_ERROR" | "USER_UNVERIFYED_ERROR"
  | "PASSWORD_DONT_MATCHES" | "UNLOGGED_ERRROR" | "SESSION_EXPIRED_ERROR"
  | "UNAUTHORIZED" | "REVOKED_TOKEN_ERROR" | "NETWORK_ERROR"

export class ApiError extends Error {
    readonly code: ApiErrorCode;
    readonly status: number | null
  constructor(
   code: ApiErrorCode,
   status: number | null,
    message: string,
  ) {
    super(message)
    this.code = code
    this.status = status
    this.name = new.target.name
  }
}
