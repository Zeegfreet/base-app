import { FindUserByUsernameRepository } from "@domain/repositories/index.js";
import { DbConnection } from "@infra/db/config/db-connection.js";
import { User } from "@infra/db/entities/user.entity.js";
import { FindOptionsSelect, Repository } from "typeorm";

export class TypeOrmFindUserByUsernameRepository implements FindUserByUsernameRepository {
    private get repository(): Repository<User>{
        return DbConnection
            .getInstance()
            .getCollection(User);
    }
    findByUsername(username: FindUserByUsernameRepository.Username): Promise<FindUserByUsernameRepository.Result | null> {
        // Seleciona todas as colunas da entidade, inclusive as marcadas com select: false (ex.: password)
        const select = Object.fromEntries(
            this.repository.metadata.columns.map(column => [column.propertyName, true])
        ) as FindOptionsSelect<User>;

        const findedUser = this.repository.findOne({ where: { username }, select });
        return findedUser;
    }

}