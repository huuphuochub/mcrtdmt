    import { Injectable } from '@nestjs/common';
    import { MailerService } from '@nestjs-modules/mailer';

    @Injectable()
    export class MailService {
      constructor(private readonly mailerService: MailerService) {}

      async sendConfirmationEmail(to: string, name: string, url: string) {
        await this.mailerService.sendMail({
          to: to,
          subject: 'Confirm your email',
          template: './confirmation', // Name of your template file (e.g., confirmation.hbs)
          context: {
            name: name,
            url: url,
          },
        });
      }
    }