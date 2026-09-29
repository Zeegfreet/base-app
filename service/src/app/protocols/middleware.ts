
import { HttpRequest } from "./http.js";

export interface Middleware<T = unknown> {
    handle(req: Middleware.Request): Promise<Middleware.Result<T>>
}

export namespace Middleware {
    export type Request<T = unknown, K = unknown, Y = unknown, J = unknown, L = unknown> = HttpRequest<T, K, Y, J, L>
    export type Result<T> =
        | { isSuccess: true; data?: T }
        | { isSuccess: false; error: Error }
}