import { Controller } from "@app/protocols/index.js";
import { ConfirmAccount } from "@domain/use-cases/index.js";
import { successHandler } from "@presentation/http/index.js";

export class ConfirmAccountController implements Controller{
    constructor(
        private readonly confirmAccount: ConfirmAccount
    ){}
    async handle(req: Controller.Request<{ token: ConfirmAccount.Token }>): Promise<Controller.Response> {
        const { token } = req.body;
        const session = await this.confirmAccount.confirm(token);
        return successHandler.onSuccess(session);

    }

}