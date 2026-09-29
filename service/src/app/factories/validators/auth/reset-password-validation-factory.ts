import { ValidationCompositeMiddleware } from "@presentation/middlewares/validation-composite-middleware.js";
import { BodyValidation } from "@presentation/validations/index.js";
import { resetPasswordSchema } from "@presentation/validations/schemas/index.js";

export const resetPasswordValidationFactory = () => {
    const bodyValidator = new BodyValidation(resetPasswordSchema);
    return new ValidationCompositeMiddleware([bodyValidator]);
};