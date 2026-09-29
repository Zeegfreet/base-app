import { ValidationCompositeMiddleware } from "@presentation/middlewares/validation-composite-middleware.js";
import { QueryValidation } from "@presentation/validations/index.js";
import { searchUsersSchema } from "@presentation/validations/schemas/index.js";

export const searchUserValidatorFactory = () => {

    const bodyValidator = new QueryValidation(searchUsersSchema);
    return new ValidationCompositeMiddleware([bodyValidator]);
};