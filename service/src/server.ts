import "reflect-metadata";

import { createApp } from "@app/app.js";
import { connectInfra } from "@infra/bootstrap/connect-infra.js";

const bootstrap = async (): Promise<void> => {
    const PORT = process.env.PORT || 8090;
    const app = await createApp();

    await connectInfra();
    
    app.listen(PORT, () => {
        console.warn(`[SERVER]: Servidor instanciado na porta ${PORT}.`);
    });
    
};

bootstrap();