import { HttpResponseCode } from "@app/protocols/index.js";
import { HttpErrorCodes } from "@presentation/protocols/errors.js";

import { HttpError } from "./http-error.js";

export class ValidationError extends HttpError {
    constructor(
        message: string = "Internal Server Error"
    ){
        super();
        this.statusCode = HttpResponseCode.ERROR_BAD_REQUEST;
        this.errorCode = HttpErrorCodes.VALIDATION_ERROR;
        this.message = message;
    }
}