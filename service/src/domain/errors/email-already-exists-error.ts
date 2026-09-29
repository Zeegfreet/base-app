import { DomainError, DomainErrorCode } from "./domain-error.js";

export class EmailAlreadyExistsError extends DomainError {
    constructor(){
        super(
            DomainErrorCode.EMAIL_ALREADY_EXISTS,
            "E-mail already exists."
        );
    }
}