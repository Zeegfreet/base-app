import { sendAccountConfirmationServiceFactory } from "@app/factories/services/index.js";
import { ResendAccountConfirmationUseCase } from "@data/use-cases/index.js";
import { TypeOrmFindUserByEmailRepository } from "@infra/db/repositories/index.js";
import { ResendAccountConfirmationController } from "@presentation/controllers/index.js";

export const resendAccountConfirmationControllerFactory = () => {
    const findUserByEmailRepository = new TypeOrmFindUserByEmailRepository();
    const sendAccountConfirmationService = sendAccountConfirmationServiceFactory();
    const resendAccountConfirmationUseCase = new ResendAccountConfirmationUseCase(
        findUserByEmailRepository,
        sendAccountConfirmationService
    );
    return new ResendAccountConfirmationController(
        resendAccountConfirmationUseCase
    );
};