import { Decrypter } from "@domain/cryptography/index.js";
import z from "zod";

export class ZodPayloadDecrypterDecorator<T> implements Decrypter<T> {
    constructor(
        private readonly decrypter: Decrypter,
        private readonly schema: z.ZodType<T>
    ){}

    async decrypt(ciphertext: Decrypter.Ciphertext): Promise<Decrypter.Result<T>> {
        const result = await this.decrypter.decrypt(ciphertext);
        if (!result.success) {
            return result;
        }

        const parsed = this.schema.safeParse(result.payload);
        if (!parsed.success) {
            return { success: false, reason: "INVALID" };
        }

        return { success: true, payload: parsed.data };
    }
}
