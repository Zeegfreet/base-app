import { DomainError, DomainErrorCode } from "./domain-error.js";

export class RevokedTokenError extends DomainError {
    constructor(){
        super(
            DomainErrorCode.REVOKED_TOKEN,
            "The received credentials is revoked."
        );
    }
}