import { SendAccountConfirmationService } from "@data/services/index.js";
import { FindUserByUsernameAndEmailRepository } from "@domain/repositories/index.js";
import { ResendAccountConfirmation } from "@domain/use-cases/index.js";

export class ResendAccountConfirmationUseCase implements ResendAccountConfirmation {
    constructor(
        private readonly findUserByUsernameAndEmailRepository: FindUserByUsernameAndEmailRepository,
        private readonly sendAccountConfirmationService: SendAccountConfirmationService
    ){}
    async resend({ email, username }: ResendAccountConfirmation.Params): Promise<void> {
        const user = await this.findUserByUsernameAndEmailRepository.findByParams({ email, username });

        if(!user){
            return;
        }

        if(user.verifiedAt || !user.isActive || user.isBlocked){
            return;
        }
        
        this.sendAccountConfirmationService.send({
            to: {
                name: user.name,
                email: user.email,
                userId: user.id
            }
        });

    }
    
}