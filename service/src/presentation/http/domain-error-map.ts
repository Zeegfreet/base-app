import { HttpResponseCode } from "@app/protocols/index.js";
import { DomainErrorCode } from "@domain/errors/index.js";
import { HttpErrorCodes } from "@presentation/protocols/index.js";

export const domainErrorMap: Record<DomainErrorCode, { status: HttpResponseCode, code: HttpErrorCodes }> = {
    [DomainErrorCode.EMAIL_ALREADY_EXISTS]: { 
        status: HttpResponseCode.ERROR_CONFLICT, 
        code: HttpErrorCodes.CONFLICT_ERROR 
    },
    [DomainErrorCode.USERNAME_ALREADY_EXISTS]: { 
        status: HttpResponseCode.ERROR_CONFLICT,
        code: HttpErrorCodes.CONFLICT_ERROR
    },
    [DomainErrorCode.NOT_FOUND_ERROR]: { 
        status: HttpResponseCode.ERROR_NOT_FOUND,
        code: HttpErrorCodes.NOT_FOUND_ERROR
    },
    [DomainErrorCode.USER_BLOCEKD]: { 
        status: HttpResponseCode.ERROR_UNAUTHORIZED,
        code: HttpErrorCodes.USER_BLOCKED_ERROR
    },
    [DomainErrorCode.USER_DISABLED]: { 
        status: HttpResponseCode.ERROR_FORBBIDEN,
        code: HttpErrorCodes.USER_DISABLED_ERROR
    },
    [DomainErrorCode.USER_UNVERIFYED]: { 
        status: HttpResponseCode.ERROR_FORBBIDEN,
        code: HttpErrorCodes.USER_UNVERIFYED_ERROR
    },
    [DomainErrorCode.USERNAME_NOT_FOUND]: { 
        status: HttpResponseCode.ERROR_UNAUTHORIZED,
        code: HttpErrorCodes.PASSWORD_DONT_MATCHES
    },
    [DomainErrorCode.PASSWORD_DONT_MATCHES]: { 
        status: HttpResponseCode.ERROR_UNAUTHORIZED,
        code: HttpErrorCodes.PASSWORD_DONT_MATCHES
    },
    [DomainErrorCode.SESSION_EXPIRED]: { 
        status: HttpResponseCode.ERROR_FORBBIDEN,
        code: HttpErrorCodes.SESSION_EXPIRED_ERROR
    },
    [DomainErrorCode.BAD_TOKEN]: { 
        status: HttpResponseCode.ERROR_UNAUTHORIZED,
        code: HttpErrorCodes.UNAUTHORIZED_ERROR
    },
    [DomainErrorCode.CONFIRMATION_TOKEN_INVALID]: { 
        status: HttpResponseCode.ERROR_UNAUTHORIZED,
        code: HttpErrorCodes.UNAUTHORIZED_ERROR
    },
    [DomainErrorCode.REVOKED_TOKEN]: { 
        status: HttpResponseCode.ERROR_FORBBIDEN,
        code: HttpErrorCodes.REVOKED_TOKEN_ERROR
    },
    [DomainErrorCode.CONFLICT]: { 
        status: HttpResponseCode.ERROR_CONFLICT,
        code: HttpErrorCodes.CONFLICT_ERROR
    }
};