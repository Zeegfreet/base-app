import { DomainError, DomainErrorCode } from "./domain-error.js";

export class PasswordDontMatchesError extends DomainError {
    constructor(){
        super(
            DomainErrorCode.PASSWORD_DONT_MATCHES,
            "Password and username don`t matches."
        );
    }
}