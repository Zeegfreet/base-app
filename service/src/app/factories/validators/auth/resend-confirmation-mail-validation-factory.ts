import { ValidationCompositeMiddleware } from "@presentation/middlewares/index.js";
import { BodyValidation } from "@presentation/validations/index.js";
import { resendConfirmationMailSchema } from "@presentation/validations/schemas/index.js";

export const resendConfirmationMailValidationFactory = () => {

    const bodyValidator = new BodyValidation(resendConfirmationMailSchema);
    return new ValidationCompositeMiddleware([bodyValidator]);
};