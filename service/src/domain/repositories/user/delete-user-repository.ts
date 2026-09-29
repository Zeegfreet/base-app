
export interface DeleteUserRepository {
    delete(id: DeleteUserRepository.Id): Promise<void>
}

export namespace DeleteUserRepository {
    export type Id = number
}