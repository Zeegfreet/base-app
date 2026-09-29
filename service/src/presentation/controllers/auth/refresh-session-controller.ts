import { Controller } from "@app/protocols/index.js";
import { RefreshSession } from "@domain/use-cases/index.js";
import { successHandler } from "@presentation/http/index.js";

export class RefreshSessionController implements Controller{
    constructor(
        private readonly refreshSession: RefreshSession
    ){}
    async handle(req: Controller.Request<{ token: string }>): Promise<Controller.Response> {
        const { token } = req.body;
        const session = await this.refreshSession.refresh({ token });
        return successHandler.onSuccess(session);
    }

}