import { sendAccountConfirmationServiceFactory } from "@app/factories/services/index.js";
import { ResendAccountConfirmationUseCase } from "@data/use-cases/index.js";
import { TypeOrmFindUserByUsernameAndEmailRepository } from "@infra/db/repositories/index.js";
import { ResendAccountConfirmationController } from "@presentation/controllers/index.js";

export const resendAccountConfirmationControllerFactory = () => {
    const findUserByUsernameAndEmailRepository = new TypeOrmFindUserByUsernameAndEmailRepository();
    const sendAccountConfirmationService = sendAccountConfirmationServiceFactory();
    const resendAccountConfirmationUseCase = new ResendAccountConfirmationUseCase(
        findUserByUsernameAndEmailRepository,
        sendAccountConfirmationService
    );
    return new ResendAccountConfirmationController(
        resendAccountConfirmationUseCase
    );
};