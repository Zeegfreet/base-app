import { SendMail } from "@domain/protocols/index.js";
import { MailerSendAccountConfirmation } from "@domain/services/index.js";
import { accountConfirmationTemplate } from "@src/templates/index.js";

export class AccountConfirmationMailerService implements MailerSendAccountConfirmation {
    constructor(
        private readonly sendMail: SendMail,
        private readonly appUrl: string
    ) {}

    async send({ to, token }: MailerSendAccountConfirmation.Params) {
        const url = `${this.appUrl}/confirm?token=${token}`;
        await this.sendMail.send({ to, ...accountConfirmationTemplate({ name: to.name, url }) });
    }
}
