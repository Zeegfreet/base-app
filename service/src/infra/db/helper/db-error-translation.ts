import { DomainError, UsernameAlreadyExists } from "@domain/errors/index.js";
import { DatabaseError } from "pg";
import { QueryFailedError } from "typeorm";

const PG_UNIQUE_VIOLATION = "23505";

const uniqueConstraintMap: Record<string, new () => DomainError> = {
    uq_users_username_not_deleted: UsernameAlreadyExists
};

export class DbErrorTranslation {
    static handle(error: unknown): unknown {
        if (
            error instanceof QueryFailedError &&
            error.driverError instanceof DatabaseError &&
            error.driverError.code === PG_UNIQUE_VIOLATION &&
            error.driverError.constraint
        ) {
            const MappedError = uniqueConstraintMap[error.driverError.constraint];
            if (MappedError) {
                return new MappedError();
            }
        }
        return error;
    }
}
