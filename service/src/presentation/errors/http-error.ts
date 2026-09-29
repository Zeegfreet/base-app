import { HttpResponseCode } from "@app/protocols/index.js";
import { HttpErrorCodes } from "@presentation/protocols/index.js";

export class HttpError extends Error {
    statusCode: HttpResponseCode = HttpResponseCode.ERROR_UNKNOWN;
    errorCode: HttpErrorCodes = HttpErrorCodes.UNKOWN_ERROR;
    constructor(
        statusCode: HttpResponseCode = HttpResponseCode.ERROR_UNKNOWN,
        errorCode: HttpErrorCodes = HttpErrorCodes.UNKOWN_ERROR,
        message: string = "Internal Server Error"
    ){
        super();
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
    }
}