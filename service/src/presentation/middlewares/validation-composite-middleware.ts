import { Controller } from "@app/protocols/index.js";
import { Middleware } from "@app/protocols/middleware.js";
import { Validation } from "@presentation/protocols/index.js";

export class ValidationCompositeMiddleware<T extends Controller.Request> implements Middleware<T> {
    constructor(private readonly validations: Validation[]) {}

    async handle(req: Controller.Request): Promise<Middleware.Result<T>> {
        let current = {};
        for (const validation of this.validations) {
            const result = await validation.validate(req);
            if (!result.isSuccess) {
                return result;
            }
            current = result.data;
        }
        return { isSuccess: true, data: current as T };
    }
}
