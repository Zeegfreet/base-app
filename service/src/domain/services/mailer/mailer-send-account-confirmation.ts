export interface MailerSendAccountConfirmation {
    send(params: MailerSendAccountConfirmation.Params): Promise<void>;
}
export namespace MailerSendAccountConfirmation {
    export type Params = { to: { name: string; email: string; }, token: string; };
}