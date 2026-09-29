import { AddUserRepository } from "@domain/repositories/index.js";
import { DbConnection } from "@infra/db/config/db-connection.js";
import { User } from "@infra/db/entities/user.entity.js";
import { DbErrorTranslation } from "@infra/db/helper/db-error-translation.js";
import { Repository } from "typeorm";

export class TypeOrmAddUserRepository implements AddUserRepository {
    private dbErrorTranslation = DbErrorTranslation;
    private get repository(): Repository<User>{
        return DbConnection
            .getInstance()
            .getCollection(User);
    }

    async add(
        user: AddUserRepository.Params
    ): Promise<AddUserRepository.Result> {
        try {
            const userToSave = this.repository.create(user);
    
            const { password: _password, deletedAt: _deletedAt, ...savedUser } = await this.repository.save(userToSave);

            return savedUser;

        } catch (error) {
            throw this.dbErrorTranslation.handle(error);
        }

    }

}