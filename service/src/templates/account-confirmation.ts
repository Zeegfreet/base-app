// templates/account-confirmation.ts
const escapeHtml = (value: string) => value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const accountConfirmationTemplate = ({ name, url }: { name: string; url: string }) => {
    const safeName = escapeHtml(name);
    const safeUrl = escapeHtml(url);
    const year = new Date().getFullYear();

    return {
        subject: "Confirme sua conta",
        text: [
            `Olá, ${name}!`,
            "",
            "Sua conta no Service Desk foi criada. Para ativá-la, acesse o link abaixo:",
            url,
            "",
            "O link expira em 24 horas. Se você não criou esta conta, ignore este e-mail.",
        ].join("\n"),
        html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>Confirme sua conta</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        Falta só um passo: confirme seu e-mail para ativar sua conta no Service Desk.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;">
        <tr>
            <td align="center" style="padding:40px 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
                    <tr>
                        <td align="center" style="padding-bottom:24px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="width:36px;height:36px;background-color:#4f46e5;border-radius:8px;text-align:center;vertical-align:middle;color:#ffffff;font-size:18px;font-weight:700;line-height:36px;">S</td>
                                    <td style="padding-left:10px;font-size:18px;font-weight:700;color:#0f172a;letter-spacing:-0.2px;">Service Desk</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="height:4px;background-color:#4f46e5;font-size:0;line-height:0;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:40px 40px 32px;">
                                        <h1 style="margin:0 0 16px;font-size:22px;line-height:30px;font-weight:700;color:#0f172a;">Olá, ${safeName}!</h1>
                                        <p style="margin:0 0 16px;font-size:15px;line-height:24px;color:#334155;">
                                            Sua conta no <strong>Service Desk</strong> foi criada com sucesso. Para começar a usar, confirme seu endereço de e-mail clicando no botão abaixo.
                                        </p>
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0;">
                                            <tr>
                                                <td align="center" style="border-radius:8px;background-color:#4f46e5;">
                                                    <a href="${safeUrl}" target="_blank" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">Confirmar minha conta</a>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="margin:0 0 8px;font-size:13px;line-height:20px;color:#64748b;">
                                            Se o botão não funcionar, copie e cole este link no seu navegador:
                                        </p>
                                        <p style="margin:0;font-size:13px;line-height:20px;word-break:break-all;">
                                            <a href="${safeUrl}" target="_blank" style="color:#4f46e5;text-decoration:underline;">${safeUrl}</a>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0 40px 40px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc;border-radius:8px;">
                                            <tr>
                                                <td style="padding:16px 20px;font-size:13px;line-height:20px;color:#475569;">
                                                    ⏱ Este link expira em <strong>24 horas</strong>. Se você não criou esta conta, pode ignorar este e-mail com segurança.
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding:24px 16px 0;font-size:12px;line-height:18px;color:#94a3b8;">
                            Este é um e-mail automático, por favor não responda.<br>
                            &copy; ${year} Service Desk
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
    };
};
