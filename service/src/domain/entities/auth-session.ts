
export interface AuthUser {
    id: number,
    name: string,
    email: string,
}

export interface AuthSession {
    user: AuthUser
    sessionId: string,
    issuedAt: Date,
    expiresAt: Date
}

export interface RefreshData {
    user: {
        id: number
    }
    sid: string,
    jti: string,
    issuedAt: Date,
    expiresAt: Date
}