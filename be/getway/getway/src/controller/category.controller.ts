import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';


@Controller('category')
export class Categorycontroller {
      constructor(private readonly httpService: HttpService) {}

   @Get('getall')
  async getProfile() {
  

  
    try {
      const { data } = await firstValueFrom(
        this.httpService.get('http://localhost:3004/category/getall', {
          
        }),
      );
      return data;
    } catch (error: any) {
      const errRes = error.response?.data;
  
      // Log hoặc ném lại lỗi tùy ý
      throw new UnauthorizedException({
        success: false,
        code: errRes?.code || 'SERVICE_ERROR',
        message: errRes?.message || 'Lỗi từ user-service',
      });
    }
  }
  
  
}


