
export interface DeleteUser {
    delete(id: DeleteUser.Id): Promise<void>
}

export namespace DeleteUser {
    export type Id = number
}