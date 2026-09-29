import { DomainError, DomainErrorCode } from "./domain-error.js";

export class NotFoundError extends DomainError {
    constructor(message: string){
        super(
            DomainErrorCode.NOT_FOUND_ERROR,
            message
        );
    }
}