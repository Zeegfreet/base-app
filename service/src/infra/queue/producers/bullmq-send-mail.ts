import { SendMail } from "@domain/protocols/index.js";
import type { Queue } from "bullmq";

import type { MailJobData } from "../queues/mail-queue.js";

export class BullMqSendMail implements SendMail {
    constructor(private readonly queue: Queue<MailJobData>) {}

    async send(mail: SendMail.Params): Promise<void> {
        await this.queue.add("send-mail", mail);
    }
}
