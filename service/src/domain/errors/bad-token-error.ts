import { DomainError, DomainErrorCode } from "./domain-error.js";

export class BadTokenError extends DomainError {
    constructor(){
        super(
            DomainErrorCode.BAD_TOKEN,
            "Current user is unauthorized."
        );
    }
}