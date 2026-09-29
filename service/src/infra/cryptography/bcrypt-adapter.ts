import { HashComparer, Hasher } from "@domain/cryptography/index.js";
import bcrypt from "bcryptjs";

export class BcryptAdapter implements Hasher, HashComparer {
    constructor(private readonly salt: number){}
    async compare(plaintext: HashComparer.Plaintext, digest: HashComparer.Digest): Promise<HashComparer.Result> {
        return bcrypt.compare(plaintext, digest);
    }
    async hash(plaintext: Hasher.Plaintext): Promise<Hasher.Result> {
        return bcrypt.hash(plaintext, this.salt);
    }

}