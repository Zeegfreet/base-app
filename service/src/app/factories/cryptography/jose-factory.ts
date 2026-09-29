import { JoseEncrypterAdapter } from "@infra/cryptography/index.js";

let accessInstance: JoseEncrypterAdapter | null;
let refreshInstance: JoseEncrypterAdapter | null;

export const joseInit = async (): Promise<void> => {
    const priv = process.env.JWT_PRIVATE_KEY_PATH || "certs/private_key.pem";
    const pub = process.env.JWT_PUBLIC_KEY_PATH || "certs/public_key.pem";
    const issuer = process.env.JWT_ISSUER || "service-desk";
    accessInstance = await JoseEncrypterAdapter.fromPemFiles(
        priv,
        pub,
        { expiresIn: process.env.JWT_EXPIRES_IN || "15m", issuer, audience: "access" });

    refreshInstance = await JoseEncrypterAdapter.fromPemFiles(
        priv,
        pub,
        { expiresIn: process.env.JWT_REFRESH_IN || "2h", issuer, audience: "refresh" });
};

export const joseAccessFactory = (): JoseEncrypterAdapter => {
    if (!accessInstance) {
        throw new Error("JoseEncrypterAdapter não inicializado. Chame initJose() no bootstrap.");
    }
    return accessInstance;
};

export const joseRefreshFactory = (): JoseEncrypterAdapter => {
    if (!refreshInstance) {
        throw new Error("JoseEncrypterAdapter não inicializado. Chame initJose() no bootstrap.");
    }
    return refreshInstance;
};