import { HealthCheckController } from "@presentation/controllers/index.js";

export const healthCheckControllerFactory = () => {
    return new HealthCheckController();
};