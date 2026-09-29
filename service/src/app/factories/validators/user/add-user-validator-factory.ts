import { ValidationCompositeMiddleware } from "@presentation/middlewares/validation-composite-middleware.js";
import { BodyValidation } from "@presentation/validations/index.js";
import { addUserSchema } from "@presentation/validations/schemas/index.js";

export const addUserValidatorFactory = () => {
    const bodyValidator = new BodyValidation(addUserSchema);
    return new ValidationCompositeMiddleware([bodyValidator]);
};