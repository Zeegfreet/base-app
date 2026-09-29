
export interface ConsumeConfirmationTokenRepository {
    consume(
        token: ConsumeConfirmationTokenRepository.Token
    ): Promise<ConsumeConfirmationTokenRepository.UserId | null>
}

export namespace ConsumeConfirmationTokenRepository {
    export type Token = string
    export type UserId = number
}