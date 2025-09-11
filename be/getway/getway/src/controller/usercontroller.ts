import { Controller, Post, Body, Res, HttpStatus, Get, Req, UseGuards, Delete, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtAuthGuardFromCookie } from 'src/auth/jwt-auth.guard';
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
                  // this.httpService.post('http://user:3004/users/login', body, {

          withCredentials: true, // Gửi và nhận cookie
        }),
      );
      
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
     return {
                success:false,
                message:'chua dang nhap',
                data:null,
                code:404
            }
  }

  try {
    const { data } = await firstValueFrom(
      this.httpService.get('http://localhost:3004/users/me', {
              // this.httpService.get('http://user:3004/users/me', {

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

@Post('logout')
async logout(@Req() req: RequestWithCookies, @Res({ passthrough: true }) res: Response) {
  const token = req.cookies?.access_token;

  // Nếu không có token thì coi như đã logout
  if (!token) {
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // true nếu deploy HTTPS
    });

    return {
      success: true,
      message: 'Đăng xuất thành công (không có token)',
    };
  }

  try {
    // Forward logout request tới user-service (nếu cần quản lý refresh token / blacklist)
    await firstValueFrom(
      this.httpService.post('http://localhost:3004/users/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
  } catch (error) {
    // Nếu user-service báo lỗi thì vẫn clear cookie,
    // vì mục đích chính là đăng xuất khỏi FE

  }

  // Xoá cookie tại gateway
  res.clearCookie('access_token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // true nếu deploy HTTPS
  });

  return {
    success: true,
    message: 'Đăng xuất thành công',
  };
}

@Get('gethistorysearch')
async gethistory(@Req() req:RequestWithCookies)
{
const token = req.cookies?.access_token;

      if (!token) {
          return {
              success: false,
              message: 'Unauthorized',
              code: 401,
          };
      }

      try {
          const { data } = await firstValueFrom(
              this.httpService.get(`http://localhost:3004/historysearch/gethistorybyuser`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              })
          );
          return data;
      } catch (error) {
          const errRes = error.response?.data || {};
          return {
              success: false,
              message: errRes.message || 'Lỗi cập nhật thông tin',
              code: errRes.code || 'UNKNOWN_ERROR',
          };
      }
            
 }

 @Delete('deletesearch/:id')
 async deletesearch(@Param('id') id:number){
  
    const ok = await
    firstValueFrom(
    
    this.httpService.delete(`http://localhost:3004/historysearch/deletehistory/${id}`))
    return   ok.data
    
  
  }

@Post('register')
async registration(@Body() body:any){
    const {data} = await firstValueFrom(
        this.httpService.post(`http://localhost:3004/users/register`,body)
    )
            return data

  }


  @Post('updateinfor')
  async updateinfor(@Req() req: RequestWithCookies, @Body() body:any){
      const token = req.cookies?.access_token;

      if (!token) {
          return {
              success: false,
              message: 'Unauthorized',
              code: 401,
          };
      }

      try {
          const { data } = await firstValueFrom(
              this.httpService.post(`http://localhost:3004/users/updateprofile`, body, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              })
          );
          return data;
      } catch (error) {
          const errRes = error.response?.data || {};
          return {
              success: false,
              message: errRes.message || 'Lỗi cập nhật thông tin',
              code: errRes.code || 'UNKNOWN_ERROR',
          };
      }
  }

}


@Controller('seller')
export class sellerController {
    constructor(private readonly httpService: HttpService) {}

    @Post('register')
    async registerSeller(
      @Req() req: RequestWithCookies,
      
      @Body() body:any){
        const token = req.cookies?.access_token;

      if(!token){
        return {
          success: false,
          message: 'Unauthorized',
          code: 401, 
        };
      }else{
         const {data} = await firstValueFrom(
            this.httpService.post(`http://localhost:3004/seller/register`,body,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            }
              
            )
        )
                return data

      }
    }

    @Post('login')
    async loginSeller(@Body() body:any, @Res({ passthrough: true }) res: Response){
                   
      const {data} = await firstValueFrom(
            this.httpService.post(`http://localhost:3004/seller/login`,body,{
                withCredentials:true
            })
        )
        const token = data.token;
        if(token){
            res.cookie('access_token',token,{
                httpOnly:true,
                maxAge:1000*60*60*24*7 //7 ngay
            })
        }
        return data
    }

    @Post('logout')
    async logoutSeller(@Req() req: RequestWithCookies, @Res({ passthrough: true }) res: Response) {
        const token = req.cookies?.access_token;

        // Nếu không có token thì coi như đã logout
        if (!token) {
            res.clearCookie('access_token', {
                httpOnly: true,
                sameSite: 'lax',
                secure: false, // true nếu deploy HTTPS
            });

            return {
                success: true,
                message: 'Đăng xuất thành công (không có token)',
            };
        }

        try {
            // Forward logout request tới user-service (nếu cần quản lý refresh token / blacklist)
            await firstValueFrom(
                this.httpService.post('http://localhost:3004/seller/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            );
        } catch (error) {
            // Nếu user-service báo lỗi thì vẫn clear cookie,
            // vì mục đích chính là đăng xuất khỏi FE
        }

        // Xoá cookie tại gateway
        res.clearCookie('access_token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false, // true nếu deploy HTTPS
        });

        return {
            success: true,
            message: 'Đăng xuất thành công',
        };
    }

    @UseGuards(JwtAuthGuardFromCookie)
    @Get('getseller')
    async Getsellerbyiduser(@GetUser() user:any ){
      
      if(!user){
        return{
          success:false,
          message:'bui long dang nhap',
          data:null
        }

      }
          const seller = await this.httpService.post('http://localhost:3004/seller/inforsellerbyuser',{user_id:user.id}).toPromise();
                        

          if(!seller?.data.success){
            return{
              success:false,
              data:null,
              message:'khong co thong tin seller da dang ki'
            }
          }else{
            return{
               success:true,
              data:seller.data.data,
              message:''
            }
          }

    }
}
