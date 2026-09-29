import { DomainError, DomainErrorCode } from "./domain-error.js";

export class UserBlockedError extends DomainError {
    constructor(
        message: string = "Currently user is blocked."
    ) {
        super(DomainErrorCode.USER_BLOCEKD, message);
    }
}