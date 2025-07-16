import { Controller, Post, Body, Res, HttpStatus, Get, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';
interface RequestWithCookies extends Request {
  cookies: Record<string, string>;
}
@Controller('users')
export class UserController {
  constructor(private readonly httpService: HttpService) {}

  @Post('login')
  async loginUser(
    @Body() body: { phone: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      // Forward request đến user-service
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:3004/users/login', body, {
          withCredentials: true, // Gửi và nhận cookie
        }),
      );
      console.log(response);
      
      // 👇 Nhận token từ user-service (nếu bạn trả về token)
      const token = response.data.token;

      if (token) {
        // Gateway gắn cookie cho FE
        res.cookie('access_token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 ngày
        });
      }

      return response.data;
    } catch (error) {
      const errRes = error.response?.data || {};
      return {
        success: false,
        message: errRes.message || 'Lỗi đăng nhập',
        code: errRes.code || 'UNKNOWN_ERROR',
      };
    }
  }


   @Get('me')
async getProfile(@Req() req: RequestWithCookies) {
  const token = req.cookies?.access_token;

  if (!token) {
    throw new UnauthorizedException('Chưa đăng nhập');
  }

  try {
    const { data } = await firstValueFrom(
      this.httpService.get('http://localhost:3004/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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


