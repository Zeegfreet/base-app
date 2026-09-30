import { HashComparer } from "@domain/cryptography/index.js";
import { PasswordDontMatchesError, UsernameNotFoundError } from "@domain/errors/index.js";
import { FindUserByUsernameRepository } from "@domain/repositories/index.js";
import { AuthService } from "@domain/services/index.js";
import { AuthLogin } from "@domain/use-cases/index.js";

export class AuthLoginUseCase implements AuthLogin {
    constructor(
        private readonly findUserByUsernameRepository: FindUserByUsernameRepository,
        private readonly hashComparer: HashComparer,
        private readonly authService: AuthService,
    ){}
    async login({ username, password }: AuthLogin.LoginData): Promise<AuthLogin.Result> {
        const user = await this.findUserByUsernameRepository.findByUsername(username);

        if(!user){
            throw new UsernameNotFoundError();
        }

        const isPasswordMatches = await this.hashComparer.compare(password, user.password as string);

        if(!isPasswordMatches){
            throw new PasswordDontMatchesError();
        }

        const loginData = await this.authService.authorize(user.id);

        return loginData;
    }

}