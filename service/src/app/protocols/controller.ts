import { HttpRequest, HttpResponse } from "./http.js";

export interface Controller<T = unknown, K = unknown, Y = unknown, J = unknown, L = unknown> {
    handle(req: Controller.Request<T, K, Y, J, L>): Promise<Controller.Response>
}

export namespace Controller {
    export type Request<T = unknown, K = unknown, Y = unknown, J = unknown, L = unknown> = HttpRequest<T, K, Y, J, L>
    export type Response = HttpResponse
}