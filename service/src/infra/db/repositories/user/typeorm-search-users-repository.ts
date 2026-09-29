import { SearchUsersRepository } from "@domain/repositories/index.js";
import { DbConnection } from "@infra/db/config/db-connection.js";
import { User } from "@infra/db/entities/index.js";
import { DbSearchConverter } from "@infra/db/helper/index.js";

export class TypeOrmSearchUsersRepository implements SearchUsersRepository {
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(User);
    }

    async search(params: SearchUsersRepository.Params): Promise<SearchUsersRepository.Result> {
        const options = DbSearchConverter.toFindOptions<User>(params, {
            searchFields: ["name", "username", "email"],
        });
        const [data, totalItems] = await this.repository.findAndCount(options);
        return DbSearchConverter.toResult(data, totalItems, params);
    }

}
