
export interface SaveRetrievePasswordTokenRepository {
    save(
        userId: SaveRetrievePasswordTokenRepository.UserId,
        token: SaveRetrievePasswordTokenRepository.Token,
        ttl: SaveRetrievePasswordTokenRepository.Ttl
    ): Promise<void>
}

export namespace SaveRetrievePasswordTokenRepository {
    export type UserId = number
    export type Token = string
    export type Ttl = number
}