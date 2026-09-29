import { randomUUID } from "node:crypto";

import { GetRandomUUID } from "@domain/cryptography/index.js";

export class CryptoGetRandomUUID implements GetRandomUUID {
    async get(): Promise<string> {
        return randomUUID();
    }

}