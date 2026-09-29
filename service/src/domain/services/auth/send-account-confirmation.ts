export interface SendAccountConfirmation {
    send(params: SendAccountConfirmation.Params): Promise<void>;
}
export namespace SendAccountConfirmation {
    export type Params = { to: { name: string; email: string; userId: number } };
}