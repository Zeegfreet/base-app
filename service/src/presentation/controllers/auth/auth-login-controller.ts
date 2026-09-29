import { Controller } from "@app/protocols/controller.js";
import { AuthLogin } from "@domain/use-cases/index.js";
import { successHandler } from "@presentation/http/index.js";

export class AuthLoginController implements Controller{
    constructor(
        private readonly authLogin: AuthLogin
    ){}
    async handle(req: Controller.Request<AuthLogin.LoginData>): Promise<Controller.Response> {
        const dto = req.body;
        const login = await this.authLogin.login(dto);
        return successHandler.onSuccess(login);
    }
    
}