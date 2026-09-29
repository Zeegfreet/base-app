export interface Encrypter<T = Record<string, unknown>> {
    encrypt(payload: Encrypter.Payload<T>): Promise<Encrypter.Result>
}

export namespace Encrypter {
    export type Payload<T = Record<string, unknown>> = T
    export type Result = string
}
