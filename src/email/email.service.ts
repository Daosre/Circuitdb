import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: Number(this.config.get('SMTP_PORT')),
      secure: process.env.MAILER_SECURE === 'false',
      auth: {
        user: this.config.get('SMTP_EMAIL'),
        pass: this.config.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendUserConfirmation(user: User, token: string) {
    const url = `${this.config.get('SERVER_URL')}/activate/${token}`;
    const emailHtml = `
    <h1>Bonjour ${user.lastName} ${user.firstName},</h1>
        <p> Vous venez de vous inscrire sur notre site Circuit du bonheur. Merci d'activer votre compte.</p>
        <a href='${url}'> Cliquez Ici </a>
        <p> Si vous n'avez pas faite cette inscription, vous pouvez ignorer ce message. </p>
        ;`;

    await this.transporter.sendMail({
      from: this.config.get('SMTP_EMAIL'),
      to: user.email,
      subject: `Bienvenue ${user.email} Confirmation de l'email`,
      html: emailHtml,
    });
  }

  async sendUserResetPassword(user: User, token: any) {
    const url = `${this.config.get('SERVER_URL')}/reset/${token}`;
    const emailHtml = `
    <h1>Bonjour ${user.lastName} ${user.firstName},</h1>
    <p> Vous venez de demander à réinitialiser votre mot de passe. Veuillez cliquer sur le lien ci-dessous</p>
    <a href='${url}'>Réinitialiser votre mot de passe</a>
    <p> Ce lien est valable que 15 minutes </p> `;

    await this.transporter.sendMail({
      from: this.config.get('SMTP_EMAIL'),
      to: user.email,
      subject: `Réinitialisation de mot de passe`,
      html: emailHtml,
    });
  }
}
