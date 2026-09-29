import { ValidationCompositeMiddleware } from "@presentation/middlewares/validation-composite-middleware.js";
import { BodyValidation } from "@presentation/validations/index.js";
import { userRegisterSchema } from "@presentation/validations/schemas/index.js";

export const userRegisterValidatorFactory = () => {
    
    const bodyValidator = new BodyValidation(userRegisterSchema);
    return new ValidationCompositeMiddleware([bodyValidator]);
};