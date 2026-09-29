
const serviceName = process.env.SERVICE_NAME || "api";

export const cacheKeys = {
    emailConfirmationByUser: (userId: string | number) => `${serviceName}:email-confirmation:by-user:${userId}`,
    emailConfirmationByToken: (token: string | number) => `${serviceName}:email-confirmation:by-token:${token}`,
    retrievePasswordByUser: (userId: string | number) => `${serviceName}:retrieve-password:by-user:${userId}`,
    retrievePasswordByToken: (token: string | number) => `${serviceName}:retrieve-password:by-token:${token}`,
    allowedSessionsBySession: (sessionId: string) => `${serviceName}:session:by-session:${sessionId}`,
    allowedSessionsByUser: (userId: string | number) => `${serviceName}:session:by-user:${userId}`,
    revokedToken: (jti: string) => `${serviceName}:token:revoked:${jti}`,
};