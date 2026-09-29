export interface MailerSendRetrievePassword {
    send(params: MailerSendRetrievePassword.Params): Promise<void>;
}
export namespace MailerSendRetrievePassword {
    export type Params = { to: { name: string; email: string; }, token: string; };
}