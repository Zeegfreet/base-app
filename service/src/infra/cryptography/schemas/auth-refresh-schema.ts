import z from "zod/v3";

export const authRefreshSchema = z.object({
    user: z.object({
        id: z.number(),
    }),
    sid: z.string(),
    jti: z.string(),
    iat: z.number(),
    exp: z.number(),
}).transform(({ user, sid, jti, iat, exp }) => ({
    user,
    sid,
    jti,
    issuedAt: new Date(iat * 1000),
    expiresAt: new Date(exp * 1000),
}));
