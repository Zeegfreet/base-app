
export interface RetrievePassword {
    retrieve(params: RetrievePassword.Params): Promise<void>
}

export namespace RetrievePassword {
    export type Params = {
        username: string,
        email: string
    }
}