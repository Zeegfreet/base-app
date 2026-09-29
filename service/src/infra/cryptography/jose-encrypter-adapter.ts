import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { Decrypter, Encrypter } from "@domain/cryptography/index.js";
import { importPKCS8, importSPKI, jwtVerify, SignJWT } from "jose";
import { JWTExpired } from "jose/errors";

const ALGORITHM = "RS256";

export type JoseAdapterOptions = {
    expiresIn: string | number
    issuer?: string
    audience?: string
}

export class JoseEncrypterAdapter implements Encrypter, Decrypter {
    constructor(
        private readonly privateKey: CryptoKey,
        private readonly publicKey: CryptoKey,
        private readonly options: JoseAdapterOptions
    ){}

    static async fromPemFiles(
        privateKeyPath: string,
        publicKeyPath: string,
        options: JoseAdapterOptions
    ): Promise<JoseEncrypterAdapter> {
        const [privatePem, publicPem] = await Promise.all([
            readFile(resolve(privateKeyPath), "utf8"),
            readFile(resolve(publicKeyPath), "utf8")
        ]);
        const [privateKey, publicKey] = await Promise.all([
            importPKCS8(privatePem, ALGORITHM),
            importSPKI(publicPem, ALGORITHM)
        ]);
        return new JoseEncrypterAdapter(privateKey, publicKey, options);
    }

    async encrypt(payload: Encrypter.Payload): Promise<Encrypter.Result> {
        const jwt = new SignJWT(payload)
            .setProtectedHeader({ alg: ALGORITHM, typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime(this.options.expiresIn)
            .setJti(this.getUUID());
        if (this.options.issuer) {
            jwt.setIssuer(this.options.issuer);
        }
        if (this.options.audience) {
            jwt.setAudience(this.options.audience);
        }
        return jwt.sign(this.privateKey);
    }

    async decrypt(ciphertext: Decrypter.Ciphertext): Promise<Decrypter.Result> {
        try {
            const { payload } = await jwtVerify(ciphertext, this.publicKey, {
                algorithms: [ALGORITHM],
                issuer: this.options.issuer,
                audience: this.options.audience
            });
            return { success: true, payload };
        } catch (err) {
            const reason: Decrypter.FailureReason = err instanceof JWTExpired ? "EXPIRED" : "INVALID";
            return { success: false, reason };
        }
    }

    private getUUID(){
        return randomUUID();
    }
}
