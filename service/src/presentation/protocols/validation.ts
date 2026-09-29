import { Controller } from "@app/protocols/index.js";

export interface Validation<T extends Partial<Controller.Request> = Partial<Controller.Request>> {
    validate(req: Controller.Request): Promise<Validation.Result<T>>
}

export namespace Validation {
    export type Result<T = unknown> =
        | { isSuccess: true; data: T }
        | { isSuccess: false; error: Error }
}
