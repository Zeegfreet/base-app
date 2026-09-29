
export interface SaveAllowedSessionRepository {
    save(
        params: SaveAllowedSessionRepository.Params
    ): Promise<void>
}

export namespace SaveAllowedSessionRepository {
    export type Params = {
        sessionId: string
        userId: number,
        ttl: number
    }
}