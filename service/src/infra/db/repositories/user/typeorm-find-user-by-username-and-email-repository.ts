import { FindUserByUsernameAndEmailRepository } from "@domain/repositories/index.js";
import { DbConnection } from "@infra/db/config/db-connection.js";
import { User } from "@infra/db/entities/user.entity.js";
import { Repository } from "typeorm";

export class TypeOrmFindUserByUsernameAndEmailRepository implements FindUserByUsernameAndEmailRepository {
    private get repository(): Repository<User>{
        return DbConnection
            .getInstance()
            .getCollection(User);
    }
    findByParams(params: FindUserByUsernameAndEmailRepository.Params): Promise<FindUserByUsernameAndEmailRepository.Result | null> {
        return this.repository.findOneBy(params);
    }

}