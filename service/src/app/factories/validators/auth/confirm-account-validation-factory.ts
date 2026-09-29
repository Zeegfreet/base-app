import { ValidationCompositeMiddleware } from "@presentation/middlewares/index.js";
import { BodyValidation } from "@presentation/validations/index.js";
import { confirmAccountSchema } from "@presentation/validations/schemas/index.js";

export const confirmAccountValidationFactory = () => {
    const bodyValidator = new BodyValidation(confirmAccountSchema);
    return new ValidationCompositeMiddleware([bodyValidator]);
};