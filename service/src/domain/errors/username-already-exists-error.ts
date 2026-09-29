import { DomainError, DomainErrorCode } from "./domain-error.js";

export class UsernameAlreadyExists extends DomainError {
    constructor(){
        super(
            DomainErrorCode.USERNAME_ALREADY_EXISTS,
            "Username Already Exists."
        );
    }
}