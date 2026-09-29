import { Controller } from "@app/protocols/index.js";
import { RetrievePassword } from "@domain/use-cases/index.js";
import { successHandler } from "@presentation/http/index.js";

export class RetrievePasswordController implements Controller{
    constructor(
        private readonly retrievePassword: RetrievePassword
    ){}
    async handle(req: Controller.Request<{ username: string, email: string }>): Promise<Controller.Response> {
        const dto = req.body;
        await this.retrievePassword.retrieve(dto);
        return successHandler.onSuccess({ message: `E-mail sent to ${dto.email} if exists.` });
    }

}