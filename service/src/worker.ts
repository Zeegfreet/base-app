import "reflect-metadata";

import { connectInfra } from "@infra/bootstrap/connect-infra.js";
import { startWorkers } from "@infra/queue/config/bullmq-start-workers.js";

const bootstrap = async (): Promise<void> => {

    await connectInfra();
    startWorkers();
};

bootstrap();