import { Controller } from "@app/protocols/index.js";
import { DeleteUser } from "@domain/use-cases/index.js";
import { successHandler } from "@presentation/http/success-handler.js";

export class DeleteUserController implements Controller{
    constructor(
        private readonly deleteUser: DeleteUser
    ){}
    async handle(req: Controller.Request): Promise<Controller.Response> {
        const { id } = req.params as { id: number };
        await this.deleteUser.delete(id);
        return successHandler.onDeleted();
    }

}