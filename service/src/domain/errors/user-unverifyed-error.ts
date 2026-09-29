import { DomainError, DomainErrorCode } from "./domain-error.js";

export class UserUnverifyedError extends DomainError {
    constructor(
        message: string = "Currently user is unverifyed."
    ) {
        super(DomainErrorCode.USER_UNVERIFYED, message);
    }
}