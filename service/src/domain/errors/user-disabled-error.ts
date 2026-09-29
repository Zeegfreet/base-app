import { DomainError, DomainErrorCode } from "./domain-error.js";

export class UserDisabledError extends DomainError {
    constructor(
        message: string = "Currently user is disabled."
    ) {
        super(DomainErrorCode.USER_DISABLED, message);
    }
}