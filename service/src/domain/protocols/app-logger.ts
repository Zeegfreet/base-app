
export interface AppLogger {
    error(message: AppLogger.Message): void
    info(message: AppLogger.Message): void
}

export namespace AppLogger {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export type Message = string | object | any
}