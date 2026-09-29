
export interface HashComparer {
    compare(plaintext: HashComparer.Plaintext, digest: HashComparer.Digest): Promise<HashComparer.Result>
}

export namespace HashComparer {
    export type Plaintext = string
    export type Digest = string
    export type Result = boolean
}