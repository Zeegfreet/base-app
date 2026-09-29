import { Middleware } from "@app/protocols/index.js";
import { ValidateSession } from "@domain/use-cases/index.js";
import { UnloggedError } from "@presentation/errors/index.js";

export class SessionValidationMiddleware implements Middleware{
    constructor(
        private readonly validateSession: ValidateSession
    ){}
    async handle(req: Middleware.Request): Promise<Middleware.Result<unknown>> {
        const { headers } = req;

        if(typeof headers !== "object"){
            throw new UnloggedError();
        }

        const { authorization } = headers as { authorization: string | undefined };

        if(!authorization){
            throw new UnloggedError();
        }

        const token = authorization.split(" ")[1];

        if(!token){
            throw new UnloggedError();
        }

        const session = await this.validateSession.validate(token);

        return { isSuccess: true, data: {
            context: session
        } };
    }

}