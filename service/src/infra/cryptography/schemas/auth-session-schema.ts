import z from "zod";

export const authSessionSchema = z.object({
    user: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
    }),
    sessionId: z.string(),
    jti: z.string(),
    iat: z.number(),
    exp: z.number(),
}).transform(({ user, sessionId, iat, exp }) => ({
    user,
    sessionId,
    issuedAt: new Date(iat * 1000),
    expiresAt: new Date(exp * 1000),
}));
