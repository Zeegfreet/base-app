import { DomainError, DomainErrorCode } from "./domain-error.js";

export class UsernameNotFoundError extends DomainError {
    constructor(
        message: string = "Password and username don`t matches."
    ){
        super(
            DomainErrorCode.USERNAME_NOT_FOUND,
            message
        );
    }
}