import type { SendMail } from "@domain/protocols/index.js";
import { type JobsOptions, Queue } from "bullmq";

import { queueConnection } from "../config/queue-connection.js";

export const MAIL_QUEUE = "mailer";
export type MailJobData = SendMail.Params;

export const mailJobOptions: JobsOptions = {
    attempts: 5,
    backoff: { type: "exponential", delay: 5_000 }, // 5s, 10s, 20s, 40s...
    removeOnComplete: { age: 60 * 60 },             // 1h
    removeOnFail: { age: 7 * 24 * 60 * 60 },        // 7 dias, para investigar
};

let mailQueue: Queue<MailJobData> | undefined;
export const getMailQueue = () =>
    (mailQueue ??= new Queue<MailJobData>(MAIL_QUEUE, {
        connection: queueConnection(),
        defaultJobOptions: mailJobOptions,
    }));
