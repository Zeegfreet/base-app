import { HttpResponse, HttpResponseCode } from "@app/protocols/index.js";
import { DomainError } from "@domain/errors/index.js";
import { HttpError } from "@presentation/errors/index.js";
import { HttpErrorCodes } from "@presentation/protocols/index.js";

import { domainErrorMap } from "./domain-error-map.js";

export const errorHandler = (error: unknown): HttpResponse => {
    if (error instanceof DomainError){
        const { status, code } = domainErrorMap[error.errorCode];
        return build(status, code, error.message);
    }
    if (error instanceof HttpError){
        return build(error.statusCode, error.errorCode, error.message);
    }
    return build(HttpResponseCode.ERROR_UNKNOWN, HttpErrorCodes.UNKOWN_ERROR, "Internal Server Error");
};

export const build = (statusCode: HttpResponseCode, error: HttpErrorCodes, message: string): HttpResponse => ({
    statusCode,
    body: {
        success: false,
        error,
        message
    }
});