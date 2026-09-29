import { AppLogger } from "@domain/protocols/index.js";

import { logger } from "./pino-logger.js";

export class PinoLoggerAdapter implements AppLogger{
    private get logger(){
        return logger;
    }
    error(message: AppLogger.Message): void {
        this.logger.error(message);
    }
    info(message: AppLogger.Message): void {
        this.logger.info(message);
    }

}