import { Controller } from "@app/protocols/index.js";
import { ResendAccountConfirmation } from "@domain/use-cases/index.js";
import { successHandler } from "@presentation/http/index.js";

export class ResendAccountConfirmationController implements Controller{
    constructor(
        private readonly resendAccountConfirmation: ResendAccountConfirmation
    ){}
    async handle(req: Controller.Request<{ email: ResendAccountConfirmation.Email }>): Promise<Controller.Response> {
        const { email } = req.body;
        await this.resendAccountConfirmation.resend(email);
        return successHandler.onSuccess({ message: "Confirmation email sended if exists." });
    }
    
}