import { Controller } from "@app/protocols/index.js";
import { FindUserById } from "@domain/use-cases/index.js";
import { successHandler } from "@presentation/http/index.js";

export class FindUserController implements Controller {
    constructor(private readonly findUserById: FindUserById){}
    async handle(req: Controller.Request): Promise<Controller.Response> {
        const { id } = req.params as { id: number };
        const user = await this.findUserById.findById(id);
        return successHandler.onSuccess(user);
    }

}