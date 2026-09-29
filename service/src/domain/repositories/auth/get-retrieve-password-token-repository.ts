
export interface GetRetrievePasswordTokenRepository {
    get(
        token: GetRetrievePasswordTokenRepository.Token
    ): Promise<GetRetrievePasswordTokenRepository.UserId | null>
}

export namespace GetRetrievePasswordTokenRepository {
    export type Token = string
    export type UserId = number
}