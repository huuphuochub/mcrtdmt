import { Body, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from 'src/service/mailerservice';
@Controller()
export class MailerController {
  constructor(private readonly mailservice: MailService) {}

  // Handler cho upload 1 ảnh
  @MessagePattern('mailer_order')
  async handleUploadImage(@Body() body:any) {
    console.log(process.env.userMailer);
    console.log(process.env.passMailer);
    
    
    return await this.mailservice.sendConfirmationEmail(body);

  }
  

  // Handler cho upload nhiều ảnh

} 