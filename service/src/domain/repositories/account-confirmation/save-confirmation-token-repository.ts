
export interface SaveConfirmationTokenRepository {
    save(
        userId: SaveConfirmationTokenRepository.UserId,
        token: SaveConfirmationTokenRepository.Token,
        ttl: SaveConfirmationTokenRepository.Ttl
    ): Promise<void>
}

export namespace SaveConfirmationTokenRepository {
    export type UserId = number
    export type Token = string
    export type Ttl = number
}