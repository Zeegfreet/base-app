
import { createHash } from "node:crypto";

import { Hasher } from "@domain/cryptography/index.js";

export class CryptoHasherAdapter implements Hasher {
    async hash(plaintext: Hasher.Plaintext): Promise<Hasher.Result> {
        return createHash("sha256").update(plaintext).digest("hex");
    }

}