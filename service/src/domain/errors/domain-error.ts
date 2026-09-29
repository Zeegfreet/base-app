// domain/errors/error-codes.ts
export enum DomainErrorCode {
    EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
    USERNAME_ALREADY_EXISTS = "USERNAME_ALREADY_EXISTS",
    NOT_FOUND_ERROR = "NOT_FOUND",
    USER_DISABLED = "USER_DISABLED",
    USER_BLOCEKD = "USER_BLOCKED",
    USER_UNVERIFYED = "USER_UNVERIFYED",
    USERNAME_NOT_FOUND = "USERNAME_NOT_FOUND",
    PASSWORD_DONT_MATCHES = "PASSWORD_DONT_MATCHES",
    SESSION_EXPIRED = "SESSION_EXPIRED",
    BAD_TOKEN = "BAD_TOKEN",
    CONFIRMATION_TOKEN_INVALID = "CONFIRMATION_TOKEN_INVALID",
    REVOKED_TOKEN = "REVOKED_TOKEN",
    CONFLICT = "CONFLICT"
}

// domain/errors/domain-error.ts
export class DomainError extends Error {
    constructor(
        public readonly errorCode: DomainErrorCode,
        message: string,
        options?: ErrorOptions,
    ) {
        super(message, options);
        this.name = new.target.name;
    }
}
