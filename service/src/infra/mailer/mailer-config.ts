import nodemailer from "nodemailer";

export const mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "localhost",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USERNAME
        ? { user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD }
        : undefined
});

export const mailDefaultFrom = {
    name: process.env.MAIL_FROM_NAME || "Service Desk",
    email: process.env.MAIL_FROM_EMAIL || "no-reply@service-desk.local"
};
