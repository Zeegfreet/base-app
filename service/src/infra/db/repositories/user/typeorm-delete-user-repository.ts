import { NotFoundError } from "@domain/errors/index.js";
import { DeleteUserRepository } from "@domain/repositories/index.js";
import { DbConnection } from "@infra/db/config/db-connection.js";
import { User } from "@infra/db/entities/index.js";

export class TypeOrmDeleteUserRepository implements DeleteUserRepository {
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(User);
    }
    async delete(id: DeleteUserRepository.Id): Promise<void> {
        const user = await this.repository.findOneBy({ id });
        if(!user) {
            throw new NotFoundError(`User not found with id ${id}.`);
        }
        await this.repository.softRemove(user);
    }

}