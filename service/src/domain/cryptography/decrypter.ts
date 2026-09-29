export interface Decrypter<T = Record<string, unknown>> {
    decrypt(ciphertext: Decrypter.Ciphertext): Promise<Decrypter.Result<T>>
}

export namespace Decrypter {
    export type Ciphertext = string
    export type Payload<T = Record<string, unknown>> = T
    export type FailureReason = "EXPIRED" | "INVALID"
    export type Result<T = Record<string, unknown>> =
        | { success: true, payload: Payload<T> }
        | { success: false, reason: FailureReason }
}
