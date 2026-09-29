import { Controller } from "@app/protocols/index.js";

export class HealthCheckController implements Controller {
    async handle(_: Controller.Request): Promise<Controller.Response> {
        return {
            statusCode: 200,
            body: {
                message: "Server is health."
            }
        };
    }

}