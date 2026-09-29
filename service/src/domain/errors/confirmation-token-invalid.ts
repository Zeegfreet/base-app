import { DomainError, DomainErrorCode } from "./domain-error.js";

export class ConfirmationTokenInvalid extends DomainError {
    constructor(){
        super(
            DomainErrorCode.CONFIRMATION_TOKEN_INVALID,
            "Received confirmation token is invalid or expires."
        );
    }
}