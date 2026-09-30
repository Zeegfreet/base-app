
import { BullMqSendMail } from "@infra/queue/producers/bullmq-send-mail.js";
import { getMailQueue } from "@infra/queue/queues/mail-queue.js";

export const queueSendMailFactory = () => {
    return new BullMqSendMail(getMailQueue());
};
