import { Controller } from "@app/protocols/index.js";
import { ResetPassword } from "@domain/use-cases/index.js";
import { successHandler } from "@presentation/http/index.js";

export class ResetPasswordController implements Controller{
    constructor(
        private readonly resetPassword: ResetPassword
    ){}
    async handle(req: Controller.Request<ResetPassword.Params>): Promise<Controller.Response> {
        const { token, password } = req.body;

        const response = await this.resetPassword.reset({ token, password });

        return successHandler.onSuccess(response);
    }

}