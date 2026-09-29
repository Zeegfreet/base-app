import { ValidationCompositeMiddleware } from "@presentation/middlewares/validation-composite-middleware.js";
import { BodyValidation } from "@presentation/validations/body-zod-validation.js";
import { validateRetrievePasswordTokenSchema } from "@presentation/validations/schemas/index.js";

export const validateRetrievePasswordTokenValidationFactory = () => {
    const bodyValidator = new BodyValidation(validateRetrievePasswordTokenSchema);
    return new ValidationCompositeMiddleware([bodyValidator]);
};