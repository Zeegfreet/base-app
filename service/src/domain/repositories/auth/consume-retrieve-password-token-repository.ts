
export interface ConsumeRetrievePasswordTokenRepository {
    consume(
        token: ConsumeRetrievePasswordTokenRepository.Token
    ): Promise<ConsumeRetrievePasswordTokenRepository.UserId | null>
}

export namespace ConsumeRetrievePasswordTokenRepository {
    export type Token = string
    export type UserId = number
}