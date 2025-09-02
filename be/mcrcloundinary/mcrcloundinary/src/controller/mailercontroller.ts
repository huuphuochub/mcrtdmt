import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from 'src/service/mailerservice';
@Controller()
export class MailerController {
  constructor(private readonly mailservice: MailService) {}

  // Handler cho upload 1 ảnh
  @MessagePattern('mailer_order')
  async handleUploadImage(@Payload() data: { file: { buffer: Buffer; mimetype: string; originalname: string } }) {


  }
  

  // Handler cho upload nhiều ảnh

} 