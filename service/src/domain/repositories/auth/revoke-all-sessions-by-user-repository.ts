
export interface RevokeAllSessionsByUserRepository {
    revoke(userId: RevokeAllSessionsByUserRepository.UserId): Promise<void>
}

export namespace RevokeAllSessionsByUserRepository{
    export type UserId = string | number
}