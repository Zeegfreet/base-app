import { Hasher } from "@domain/cryptography/index.js";
import { UsernameAlreadyExists } from "@domain/errors/username-already-exists-error.js";
import { AddUserRepository, FindUserByUsernameRepository } from "@domain/repositories/index.js";
import { SendAccountConfirmation } from "@domain/services/index.js";
import { UserRegister } from "@domain/use-cases/index.js";

export class UserRegisterUseCase implements UserRegister {
    constructor(
        private readonly findUserByUsernameRepository: FindUserByUsernameRepository,
        private readonly hasher: Hasher,
        private readonly addUserRepository: AddUserRepository,
        private readonly sendAccountConfirmation: SendAccountConfirmation
    ){}
    async register(data: UserRegister.Params): Promise<UserRegister.Result> {
        const existsUser = await this.findUserByUsernameRepository.findByUsername(data.username);
        if(existsUser){
            throw new UsernameAlreadyExists();
        }
        data.password = await this.hasher.hash(data.password);
        const { isActive: _isActive, isBlocked: _isBlocked, verifiedAt: _verifiedAt, ...user } = await this.addUserRepository.add(data);

        this.sendAccountConfirmation.send({
            to: { 
                userId: user.id,
                name: user.name,
                email: user.email
            },
        });
        
        return {...user, status: "Pending confirmation."};
    }
    
}