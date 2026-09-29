import { NotFoundError } from "@domain/errors/not-found-error.js";
import { UpdateUserRepository } from "@domain/repositories/index.js";
import { DbConnection } from "@infra/db/config/db-connection.js";
import { User } from "@infra/db/entities/index.js";

export class TypeOrmUpdateUserRepository implements UpdateUserRepository {
    private get repository(){
        return DbConnection
            .getInstance()
            .getCollection(User);
    }
    async update(id: UpdateUserRepository.Id, data: UpdateUserRepository.UserData): Promise<UpdateUserRepository.Result> {
        const user = await this.repository.findOneBy({ id });
        if(!user){
            throw new NotFoundError(`User not found wiht id ${id}.`);
        }
        Object.assign(user, data);
        const { password: _password, deletedAt: _deletedAt, ...updatedUser } = await this.repository.save(user);
        return updatedUser;
    }

}