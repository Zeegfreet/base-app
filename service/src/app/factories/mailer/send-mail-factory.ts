import { mailDefaultFrom, mailTransporter, NodemailerSendMail } from "@infra/mailer/index.js";

export const sendMailFactory = () => {
    return new NodemailerSendMail(mailTransporter, mailDefaultFrom);
};
