
export interface Hasher {
    hash(plaintext: Hasher.Plaintext): Promise<Hasher.Result>
}

export namespace Hasher {
    export type Plaintext = string
    export type Result = string
}