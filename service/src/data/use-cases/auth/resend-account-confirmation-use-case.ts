import { SendAccountConfirmationService } from "@data/services/index.js";
import { FindUserByEmailRepository } from "@domain/repositories/index.js";
import { ResendAccountConfirmation } from "@domain/use-cases/index.js";

export class ResendAccountConfirmationUseCase implements ResendAccountConfirmation {
    constructor(
        private readonly findUserByEmailRepository: FindUserByEmailRepository,
        private readonly sendAccountConfirmationService: SendAccountConfirmationService
    ){}
    async resend(email: ResendAccountConfirmation.Email): Promise<void> {
        const user = await this.findUserByEmailRepository.findByEmail(email);

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