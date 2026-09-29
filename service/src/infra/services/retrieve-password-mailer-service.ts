import { SendMail } from "@domain/protocols/index.js";
import { MailerSendRetrievePassword } from "@domain/services/index.js";
import { retrievePasswordTemplate } from "@src/templates/index.js";

export class RetrievePasswordMailerService implements MailerSendRetrievePassword {
    constructor(
        private readonly sendMail: SendMail,
        private readonly appUrl: string
    ) {}

    async send({ to, token }: MailerSendRetrievePassword.Params) {
        const url = `${this.appUrl}/retrieve-password?token=${token}`;
        await this.sendMail.send({ to, ...retrievePasswordTemplate({ name: to.name, url }) });
    }
}
