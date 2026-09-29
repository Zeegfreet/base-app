
export interface GetRevokedTokenRepository {
    get(
        jti: GetRevokedTokenRepository.Jti
    ): Promise<GetRevokedTokenRepository.UserId | null>
}

export namespace GetRevokedTokenRepository {
    export type Jti = string

    export type UserId = number
}