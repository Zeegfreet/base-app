import { ValidationCompositeMiddleware } from "@presentation/middlewares/validation-composite-middleware.js";
import { BodyValidation } from "@presentation/validations/index.js";
import { updateUserSchema } from "@presentation/validations/schemas/index.js";

export const updateUserValidatorFactory = () => {

    const bodyValidator = new BodyValidation(updateUserSchema);
    return new ValidationCompositeMiddleware([bodyValidator]);
};