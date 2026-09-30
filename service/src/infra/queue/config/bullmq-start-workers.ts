import { sendMailFactory } from "@app/factories/mailer/send-mail-factory.js";

import { createMailWorker } from "../workers/mail-worker.js";

export const startWorkers = () => {
    const mailWorker = createMailWorker((data) => sendMailFactory().send(data));

    const handleShutdown = async () => {
        await mailWorker.close();
        process.exit(0);
    };
    process.on("SIGTERM",handleShutdown);
    process.on("SIGINT", handleShutdown);
};