import { DomainError, DomainErrorCode } from "./domain-error.js";

export class SessionExpiredError extends DomainError {
    constructor(){
        super(
            DomainErrorCode.SESSION_EXPIRED,
            "The provided session is expired, please refresh."
        );
    }
}