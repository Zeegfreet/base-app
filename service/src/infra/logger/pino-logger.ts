import pino from "pino";

import { pinoConfig } from "./pino-config.js";

const { config, transport } = pinoConfig();
// Esta instância é usada para logs manuais: logger.info("Mensagem")
export const logger = pino(config, transport);