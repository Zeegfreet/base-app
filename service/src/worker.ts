import "reflect-metadata";

import { connectInfra } from "@infra/bootstrap/connect-infra.js";

const bootstrap = async (): Promise<void> => {

    await connectInfra();
    
};

bootstrap();