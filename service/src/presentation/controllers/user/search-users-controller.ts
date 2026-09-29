import { Controller } from "@app/protocols/index.js";
import { SearchUsers } from "@domain/use-cases/index.js";
import { successHandler } from "@presentation/http/index.js";

export class SearchUsersController implements Controller {
    constructor(
        private readonly searchUser: SearchUsers
    ){}
    async handle(req: Controller.Request): Promise<Controller.Response> {
        const params = req.query as SearchUsers.Params;
        const response = await this.searchUser.search(params);
        return successHandler.onSuccess(response);
    }

}