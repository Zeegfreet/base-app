import { FindUserByIdRepository } from "@domain/repositories/index.js";
import { DbConnection } from "@infra/db/config/db-connection.js";
import { User } from "@infra/db/entities/user.entity.js";
import { Repository } from "typeorm";

export class TypeOrmFindUsrByIdRepository implements FindUserByIdRepository {
    private get repository(): Repository<User>{
        return DbConnection
            .getInstance()
            .getCollection(User);
    }
    findById(id: FindUserByIdRepository.Id): Promise<FindUserByIdRepository.Result | null> {
        const findedUser =  this.repository.findOneBy({ id });
        return findedUser;
    }

}