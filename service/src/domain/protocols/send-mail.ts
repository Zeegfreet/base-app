export interface SendMail {
    send(mail: SendMail.Params): Promise<void>
}

export namespace SendMail {
    export type Address = {
        name?: string
        email: string
    }

    export type Attachment = {
        filename: string
        content: Buffer | string
        contentType?: string
    }

    export type Params = {
        to: Address | Address[]
        subject: string
        text?: string
        html?: string
        from?: Address
        cc?: Address | Address[]
        bcc?: Address | Address[]
        replyTo?: Address
        attachments?: Attachment[]
    }
}
