import { ValidationCompositeMiddleware } from "@presentation/middlewares/index.js";
import { BodyValidation } from "@presentation/validations/index.js";
import { refreshSessionSchema } from "@presentation/validations/schemas/index.js";

export const refreshSessionValidationFactory = () => {
    const bodyValidation = new BodyValidation(refreshSessionSchema);
    return new ValidationCompositeMiddleware([bodyValidation]);
};