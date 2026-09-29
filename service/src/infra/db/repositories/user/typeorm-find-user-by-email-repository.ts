import { FindUserByEmailRepository } from "@domain/repositories/index.js";
import { DbConnection } from "@infra/db/config/db-connection.js";
import { User } from "@infra/db/entities/user.entity.js";
import { Repository } from "typeorm";

export class TypeOrmFindUserByEmailRepository implements FindUserByEmailRepository {
    private get repository(): Repository<User>{
        return DbConnection
            .getInstance()
            .getCollection(User);
    }
    findByEmail(email: FindUserByEmailRepository.Email): Promise<FindUserByEmailRepository.Result | null> {
        const findedUser =  this.repository.findOneBy({ email });
        return findedUser;
    }

}