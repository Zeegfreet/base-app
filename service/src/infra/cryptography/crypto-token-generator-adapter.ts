import { randomBytes } from "node:crypto";

import { TokenGenerator } from "@domain/cryptography/index.js";

export class CryptoTokenGeneratorAdapter implements TokenGenerator{
    
    async generate(): Promise<string> {
        return randomBytes(32).toString("hex");
    }

}