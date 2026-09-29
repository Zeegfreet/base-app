import { BcryptAdapter } from "@infra/cryptography/bcrypt-adapter.js";

export const passwordHasherFactory = () => {
    return new BcryptAdapter(Number(process.env.HASH_SALT) || 2);
};