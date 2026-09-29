import { SendMail } from "@domain/protocols/index.js";
import type { SendMailOptions, Transporter } from "nodemailer";

export class NodemailerSendMail implements SendMail {
    constructor(
        private readonly transporter: Transporter,
        private readonly defaultFrom: SendMail.Address
    ) {}

    async send(mail: SendMail.Params): Promise<void> {
        const options: SendMailOptions = {
            from: this.toAddress(mail.from ?? this.defaultFrom),
            to: this.toAddresses(mail.to),
            cc: mail.cc && this.toAddresses(mail.cc),
            bcc: mail.bcc && this.toAddresses(mail.bcc),
            replyTo: mail.replyTo && this.toAddress(mail.replyTo),
            subject: mail.subject,
            text: mail.text,
            html: mail.html,
            attachments: mail.attachments
        };
        await this.transporter.sendMail(options);
    }

    private toAddress({ name, email }: SendMail.Address) {
        return { name: name ?? "", address: email };
    }

    private toAddresses(value: SendMail.Address | SendMail.Address[]) {
        return (Array.isArray(value) ? value : [value]).map((a) => this.toAddress(a));
    }
}
