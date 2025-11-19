import { Controller, Get, Param, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
// const urluser = '${urluser}'
const urlproduct = 'http://localhost:3002'

@Controller('subcategory')
export class Subcategorycontroller {
      constructor(private readonly httpService: HttpService) {}

   @Get(':id')
  async getProfile(@Param('id') id: number) {
  

  
    try {
      const { data } = await firstValueFrom(
        // this.httpService.get(`http://localhost:3002/subcategory/${id}`, {
                this.httpService.get(`${urlproduct}/subcategory/${id}`, {


          
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


