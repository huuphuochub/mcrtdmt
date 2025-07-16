import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UploadService } from './cloundinary/cloundinay.upload';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // Handler cho upload 1 ảnh
  @MessagePattern('upload_queue')
  async handleUploadImage(@Payload() data: { file: { buffer: Buffer; mimetype: string; originalname: string } }) {
    if (!data?.file) {
      return { success: false, message: 'No file provided' };
    }
    // Tạo object giả lập Express.Multer.File
    const file: Express.Multer.File = {
      ...data.file,
      fieldname: 'file',
      size: data.file.buffer.length,
      encoding: '7bit',
      destination: '',
      filename: data.file.originalname,
      path: '',
      stream: undefined as any,
      buffer: Buffer.from(data.file.buffer),
    };
    try {
      const url = await this.uploadService.uploadImage(file);
      return { success: true, url };
    } catch (err) {
      return { success: false, message: err?.message || 'Upload failed' };
    }
  }

  // Handler cho upload nhiều ảnh
  @MessagePattern('subimg_queue')
  async handleUploadImages(@Payload() data: { files: { buffer: Buffer; mimetype: string; originalname: string }[] }) {
    if (!data?.files || !Array.isArray(data.files)) {
      return { success: false, message: 'No files provided' };
    }
    try {
      const urls = await Promise.all(
        data.files.map((f, idx) => {
          const file: Express.Multer.File = {
            ...f,
            fieldname: 'file' + idx,
            size: f.buffer.length,
            encoding: '7bit',
            destination: '',
            filename: f.originalname,
            path: '',
            stream: undefined as any,
            buffer: Buffer.from(f.buffer),
          };
          return this.uploadService.uploadImage(file);
        })
      );
      return { success: true, urls };
    } catch (err) {
      return { success: false, message: err?.message || 'Upload failed' };
    }
  }
} 