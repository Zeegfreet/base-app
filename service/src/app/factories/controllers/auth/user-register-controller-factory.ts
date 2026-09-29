import { sendAccountConfirmationServiceFactory } from "@app/factories/services/auth/send-account-confirmation-service-factory.js";
import { UserRegisterUseCase } from "@data/use-cases/index.js";
import { BcryptAdapter } from "@infra/cryptography/index.js";
import { TypeOrmAddUserRepository, TypeOrmFindUserByUsernameRepository } from "@infra/db/repositories/index.js";
import { UserRegisterController } from "@presentation/controllers/index.js";

export const userRegisterControllerFactory = () => {
    const findUserByUsernameRepository = new TypeOrmFindUserByUsernameRepository();
    const hasher = new BcryptAdapter(2);
    
    const addUserRepository = new TypeOrmAddUserRepository();

    const sendAccountConfirmationService = sendAccountConfirmationServiceFactory();
    
    const userRegisterUseCase = new UserRegisterUseCase(
        findUserByUsernameRepository,
        hasher,
        addUserRepository,
        sendAccountConfirmationService
    );
    return new UserRegisterController(userRegisterUseCase);
};