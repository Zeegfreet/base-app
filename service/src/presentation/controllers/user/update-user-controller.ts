import { Controller } from "@app/protocols/index.js";
import { UpdateUser } from "@domain/use-cases/index.js";
import { successHandler } from "@presentation/http/index.js";

export class UpdateuserController implements Controller{
    constructor(
        private readonly updateUser: UpdateUser
    ){}
    async handle(req: Controller.Request): Promise<Controller.Response> {
        const dto = req.body as UpdateUser.UserData;
        const { id } = req.params as { id: number };
        const updatedUser = await this.updateUser.update(id, dto);
        return successHandler.onSuccess(updatedUser);
    }
}