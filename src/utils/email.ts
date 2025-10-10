import nodemailer from 'nodemailer'
import { MAILSERVER } from 'astro:env/server'

export const mailConfig = JSON.parse(MAILSERVER)
export const transporter = nodemailer.createTransport(mailConfig)

export async function sendEmail(to: string, subject: string, html: string) {
  const message = {
    from: mailConfig.auth.user,
    to,
    subject,
    html
  }
  await transporter.sendMail(message)
}
