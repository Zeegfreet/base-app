import { Controller } from "@app/protocols/index.js";
import { ValidateRetrievePasswordToken } from "@domain/use-cases/index.js";
import { successHandler } from "@presentation/http/index.js";

export class ValidateRetrievePasswordTokenController implements Controller{
    constructor(
        private readonly validateRetrievePasswordToken: ValidateRetrievePasswordToken
    ){}
    async handle(req: Controller.Request<{ token: string }>): Promise<Controller.Response> {
        const { token } = req.body;
        const isValid  = await this.validateRetrievePasswordToken.validate(token);
        return successHandler.onSuccess({ isValid });
    }

}