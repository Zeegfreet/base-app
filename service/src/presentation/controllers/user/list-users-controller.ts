import { Controller } from "@app/protocols/index.js";
import { ListUsers } from "@domain/use-cases/index.js";
import { successHandler } from "@presentation/http/index.js";

export class ListUsersController implements Controller {
    constructor(
        private readonly listUsers: ListUsers
    ){}
    async handle(_req: Controller.Request): Promise<Controller.Response> {
        const users = await this.listUsers.list();
        return successHandler.onSuccess(users);
    }

}