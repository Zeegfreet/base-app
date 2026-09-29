import { ListUsersRepository } from "@domain/repositories/index.js";
import { DbConnection } from "@infra/db/config/db-connection.js";
import { User } from "@infra/db/entities/user.entity.js";

export class TypeOrmListUserRepository implements ListUsersRepository{
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(User);
    }
    list(): Promise<ListUsersRepository.Result[]> {
        return this.repository.find();
    }

}