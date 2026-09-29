import { ValidationCompositeMiddleware } from "@presentation/middlewares/index.js";
import { BodyValidation } from "@presentation/validations/index.js";
import { retrievePasswordSchema } from "@presentation/validations/schemas/index.js";

export const retrievePasswordValidationFactory = () => {
    const bodyValidator = new BodyValidation(retrievePasswordSchema);
    return new ValidationCompositeMiddleware([bodyValidator]);
};