import { DomainError, DomainErrorCode } from "./domain-error.js";

export class ConflictError extends DomainError {
    constructor(
        message: string = "Password and username don`t matches."
    ){
        super(
            DomainErrorCode.CONFLICT,
            message
        );
    }
}