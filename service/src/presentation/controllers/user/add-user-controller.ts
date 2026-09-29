import { Controller } from "@app/protocols/index.js";
import { AddUser } from "@domain/use-cases/index.js";
import { successHandler } from "@presentation/http/index.js";

export class AddUserController implements Controller {
    constructor(
        private readonly addUserUseCase: AddUser
    ){}
    async handle(req: Controller.Request): Promise<Controller.Response> {
        const dto: AddUser.Params = req.body as AddUser.Params;
        const createdUser = await this.addUserUseCase.add(dto);
        return successHandler.onCreated(createdUser);

    }

}