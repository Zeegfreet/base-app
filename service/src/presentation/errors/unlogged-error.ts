import { HttpResponseCode } from "@app/protocols/index.js";
import { HttpErrorCodes } from "@presentation/protocols/errors.js";

import { HttpError } from "./http-error.js";

export class UnloggedError extends HttpError {
    constructor(
        message: string = "Token not provided in request or user is unauthorized."
    ){
        super();
        this.statusCode = HttpResponseCode.ERROR_UNAUTHORIZED;
        this.errorCode = HttpErrorCodes.UNLOGGED_ERROR;
        this.message = message;
    }
}