import { Controller } from "@app/protocols/index.js";
import { UserRegister } from "@domain/use-cases/index.js";
import { successHandler } from "@presentation/http/index.js";

export class UserRegisterController implements Controller{
    constructor(
        private readonly userRegister: UserRegister
    ){}
    async handle(req: Controller.Request<UserRegister.Params>): Promise<Controller.Response> {
        const dto = req.body;
        const userRegistered = await this.userRegister.register(dto);
        return successHandler.onSuccess(userRegistered);
    }

}