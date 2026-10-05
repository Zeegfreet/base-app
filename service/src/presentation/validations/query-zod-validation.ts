import { Controller } from "@app/protocols/index.js";
import { ValidationError } from "@presentation/errors/index.js";
import { Validation } from "@presentation/protocols/index.js";
import type { ZodType } from "zod";

export class QueryValidation<T> implements Validation {
    constructor(private readonly schema: ZodType<T>) {}

    async validate(req: Controller.Request): Promise<Validation.Result<{ query: unknown }>> {
        const result = this.schema.safeParse(req.query);
        if (!result.success) {
            const message = result.error.issues.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ");
            return { isSuccess: false, error: new ValidationError(message) };
        }
        return { isSuccess: true, data: { query: result.data } };
    }
}
