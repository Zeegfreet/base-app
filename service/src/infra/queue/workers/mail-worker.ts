import { Worker } from "bullmq";

import { queueConnection } from "../config/queue-connection.js";
import { MAIL_QUEUE, type MailJobData } from "../queues/mail-queue.js";

export const createMailWorker = (handle: (data: MailJobData) => Promise<void>) => {
    const worker = new Worker<MailJobData>(MAIL_QUEUE, (job) => handle(job.data), {
        connection: queueConnection(),
        concurrency: 5,
    });
    worker.on("ready", () => {
        console.warn(`🚀[WORKER - ${MAIL_QUEUE}]: ready to receive jobs.`);
    });
    worker.on("completed", (job) => {
        console.warn(`[WORKER - ${MAIL_QUEUE}]: job: ${job?.id} finalizada com sucesso`);
    });
    worker.on("failed", (job, err) =>
        console.error(`[WORKER - ${MAIL_QUEUE}]: job ${job?.id} falhou (tentativa ${job?.attemptsMade})`, err));

    return worker;
};