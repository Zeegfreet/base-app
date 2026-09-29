
export interface GetAllowedSessionRepository {
    get(sessionId: GetAllowedSessionRepository.SessionId): Promise<GetAllowedSessionRepository.UserId | null>
}

export namespace GetAllowedSessionRepository {
    export type SessionId = string

    export type UserId = number
}