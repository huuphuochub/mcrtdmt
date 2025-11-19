import { Controller, Post, Body, Res, HttpStatus, Get, Req, UseGuards, Delete, Param, Query, Inject, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtAuthGuardFromCookie } from 'src/auth/jwt-auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
const urluser = 'http://localhost:3004'
const urlproduct = 'http://localhost:3002'
interface RequestWithCookies extends Request {
  cookies: Record<string, string>;
}
@Controller('users')
export class UserController {
  constructor(private readonly httpService: HttpService,
                private authService : AuthService,
                    @Inject('UPLOAD_SERVICE') private readonly uploadImgClient: ClientProxy,
                    @Inject('SEND_OTP_EMAIL') private readonly sendOTPEmail: ClientProxy,

    
  ) {}

  @Post('login')
  async loginUser(
    @Body() body: { phone: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      // Forward request đến user-service
      const response = await firstValueFrom(
        // this.httpService.post('http://localhost:3004/users/login', body, {
                this.httpService.post(`${urluser}/users/login`, body, {


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


  @UseGuards(JwtAuthGuardFromCookie)
  @Post('resetpassword')
  async resetpassword(@Body() body:any,@GetUser() user:any){
    console.log('chưa đang nhập');
    
    if(!user){
      return{
         success: false,
        message: 'chưa đăng nhập',
        data: null,
      }
    }
    try {
      const data:any = await 
        // this.httpService.post('http://localhost:3004/users/resetpassword', {...body, id: user.id}).toPromise()
                this.httpService.post(`${urluser}/users/resetpassword`, {...body, id: user.id}).toPromise()

      ;
      return data.data;
    } catch (error) {
      const errRes = error.response?.data || {};
      return {
        success: false,
        message: errRes.message || 'Lỗi reset password',
        data: null,
      };
    }
  }

  @Post('checkmail')
  async checkmail(@Body() body:any,@Res({ passthrough: true }) res: Response){
   console.log(body);
   
    try {
      // const data:any = await this.httpService.post('http://localhost:3004/users/checkmail', body).toPromise();
            const data:any = await this.httpService.post(`${urluser}/users/checkmail`, body).toPromise();

      // console.log(data.data.success);
     
      if(data.data.success){
         const ok = {
        email: data.data.data.email,
        code: data.data.data.code,
      }
       res.cookie('email_otp', data.data.data.email, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // true nếu la https
      maxAge: 3 * 60 * 1000, 
    });
        this.sendOTPEmail.emit('send_otp_email', ok);
        console.log('da gui mail');
        
        return {
          success:true,
          message:'Đã gửi mã OTP về email',
          data:null
        }
      }else{
        console.log('emailk ton tai');
        
        return data.data
      }
      
      // return data.data;
    } catch (error) { 
       
      const errRes = error.response?.data || {};
      return {
        success: false,
        message: errRes.message || 'Lỗi check mail',
        data: null,
      };
    }
  }


  @Post('verifyotp')
  async verifyotp(@Body() body:any,@Req() req: RequestWithCookies,@Res({ passthrough: true }) res: Response){
    const email = req.cookies?.email_otp;
    if(!email){
      return {
        success:false,
        message:'Mã OTP đã hết hạn, vui lòng thử lại',
        data:null
      }
    }
    try {
      // const data:any = await this.httpService.post('http://localhost:3004/users/verifyotp', {...body,email}).toPromise();
            const data:any = await this.httpService.post(`${urluser}/users/verifyotp`, {...body,email}).toPromise();

      // Xoá cookie sau khi xác thực thành công
      if(data.data.success){
      res.clearCookie('email_otp', {
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // true nếu la https
      });
      }
      return data.data;
    }
      catch (error) {
      const errRes = error.response?.data || {};
      return {
        success: false,
        message: errRes.message || 'Lỗi verify otp',
        data: null,
      };
    }
  }

  @Post('resetpassviaemail')
  async resetpassviaemail(@Body() body:any){
    try {
      // const data:any = await this.httpService.post('http://localhost:3004/users/resetpassviaemail', body).toPromise();
            const data:any = await this.httpService.post(`${urluser}/users/resetpassviaemail`, body).toPromise();

      return data.data;
    } catch (error) {
      const errRes = error.response?.data || {};
      return {
        success: false,
        message: errRes.message || 'Lỗi reset password',
        data: null,
      };
    }
  }

  

@UseGuards(JwtAuthGuardFromCookie)
@Post('settinginfor')
@UseInterceptors(FileFieldsInterceptor([{ name: 'mainImage', maxCount: 1 }]))
async settingInfor(
  @Body() body: any,
  @GetUser() user: any,
  @UploadedFiles()
  files: { mainImage?: Express.Multer.File[] },
) {
  if (!user) {
    return {
      success: false,
      data: null,
      message: 'Không có token user',
    };
  }

  // --- Xử lý upload ảnh nếu có ---
  let imageUrl: string | undefined;
  const image = files.mainImage?.[0];

  if (image) {
    const img = await this.uploadImgClient
      .send('upload_queue', {
        file: {
          buffer: image.buffer,
          originalname: image.originalname,
          mimetype: image.mimetype,
        },
      })
      .toPromise();

    imageUrl = img.url;
  }

  // --- Chuẩn bị payload update ---
  const updatePayload: any = {
    id: user.id,
    ...body,
  };

  if (imageUrl) {
    updatePayload.avatarUrl = imageUrl;
  } 

  // --- Gửi sang service update user ---
  try {
    const  data:any  = await this.httpService
      // .post('http://localhost:3004/users/settinginfor', updatePayload)
            .post(`${urluser}/users/settinginfor`, updatePayload)

      .toPromise();

    return { success: true, data:data.data };
  } catch (error) {
    console.error('Update error:', error?.response?.data || error);
    return { success: false, message: 'Update thất bại', error };
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
      // this.httpService.get('http://localhost:3004/users/me', {
            this.httpService.get(`${urluser}/users/me`, {


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
    res.clearCookie('seller_token', {
               httpOnly: true,
                sameSite: 'lax',
                secure: false, 
            });

    return {
      success: true,
      message: 'Đăng xuất thành công (không có token)',
    };
  }

  try {
    res.clearCookie('seller_token', {
               httpOnly: true,
                sameSite: 'lax',
                secure: false, 
            });
    // Forward logout request tới user-service (nếu cần quản lý refresh token / blacklist)
    await firstValueFrom(
      // this.httpService.post('http://localhost:3004/users/logout', {}, {
            this.httpService.post(`${urluser}/users/logout`, {}, {

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
              // this.httpService.get(`http://localhost:3004/historysearch/gethistorybyuser`, {
                            this.httpService.get(`${urluser}/historysearch/gethistorybyuser`, {

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
    
    // this.httpService.delete(`http://localhost:3004/historysearch/deletehistory/${id}`))
        this.httpService.delete(`${urluser}/historysearch/deletehistory/${id}`))

    return   ok.data
    
  
  }

@Post('register')
async registration(@Body() body:any){
    const {data} = await firstValueFrom(
        // this.httpService.post(`http://localhost:3004/users/register`,body)
                this.httpService.post(`${urluser}/users/register`,body)

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
              // this.httpService.post(`http://localhost:3004/users/updateprofile`, body, {
                            this.httpService.post(`${urluser}/users/updateprofile`, body, {

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
    @Inject('UPLOAD_SERVICE') private readonly uploadImgClient: ClientProxy

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
            // this.httpService.post(`http://localhost:3004/seller/register`,body,
                        this.httpService.post(`${urluser}/seller/register`,body,

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





    @Get('all')
    async GetAllSeller(){
      try {
        const data:any = await firstValueFrom(      
        // this.httpService.get('http://localhost:3004/seller/all'));
                this.httpService.get(`${urluser}/seller/all`));

        return data.data
      } catch (error) {
        return{
          success:false,
          data:null,
          message:'loi gateway'
        }
      }
    }

    @Post('searchname')
    async SearchName(@Body() body:any){
      try {
        // const data:any =await this.httpService.post('http://localhost:3004/seller/searchname',body).toPromise();
                const data:any =await this.httpService.post(`${urluser}/seller/searchname`,body).toPromise();

        return data.data
      } catch (error) {
        return{
          success:false,
          data:null,
          message:null,
        }
      }
    }

    @Post('login')
    async loginSeller(@Body() body:any, @Res({ passthrough: true }) res: Response){
                   
      const {data} = await firstValueFrom(
            // this.httpService.post(`http://localhost:3004/seller/login`,body,{
                        this.httpService.post(`${urluser}/seller/login`,body,{

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
        const tokenseller = req.cookies?.seller_token;
        

        // Nếu không có token thì coi như đã logout
        if (!token) {
          
            res.clearCookie('access_token', {
                httpOnly: true,
                sameSite: 'lax',
                secure: false, // true nếu deploy HTTPS
            });
            res.clearCookie('seller_token', {
               httpOnly: true,
                sameSite: 'lax',
                secure: false, 
            });

            return {
                success: true,
                message: 'Đăng xuất thành công (không có token)',
            };
        }

        try {
          
            // Forward logout request tới user-service (nếu cần quản lý refresh token / blacklist)
            await firstValueFrom(
                // this.httpService.post('http://localhost:3004/seller/logout', {}, {
                                this.httpService.post(`${urluser}/seller/logout`, {}, {

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            );
             res.clearCookie('access_token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false, // true nếu deploy HTTPS
        });
        
         res.clearCookie('seller_token', {
               httpOnly: true,
                sameSite: 'lax',
                secure: false,  
            });

        } catch (error) {
            // Nếu user-service báo lỗi thì vẫn clear cookie,
            // vì mục đích chính là đăng xuất khỏi FE
        }

        // Xoá cookie tại gateway
       
        return {
            success: true,
            message: 'Đăng xuất thành công',
        };
    }

    @UseGuards(JwtAuthGuardFromCookie)
    @Get('getseller')
    async Getsellerbyiduser(@GetUser() user:any ,
      @Res({ passthrough: true }) res: Response,

  ){
        
      if(!user){
        return{
          success:false,
          message:'bui long dang nhap',
          data:null
        }

      }
          // const seller:any = await this.httpService.post('http://localhost:3004/seller/inforsellerbyuser',{user_id:user.id}).toPromise();
                    const seller:any = await this.httpService.post(`${urluser}/seller/inforsellerbyuser`,{user_id:user.id}).toPromise();

          

          if(!seller?.data.success){
            return{
              success:false,
              data:null,
              message:'khong co thong tin seller da dang ki'
            }
          }else{

            // const token = this.authService.generateToken({
              const token = seller.data.token;
 
              
              if(token){
                res.cookie('seller_token', token ,{
                  httpOnly:true,
                  maxAge:1000*60*60*24*7,
                });
              }
              
            //  })
            
            
            return{
               success:true,
              data:seller.data.data,
              message:''
            }
          }

    }

    @Get('allproduct/:id')
    async GetAllProduct(@Param('id') id:number,@Query('limit') limit:string, @Query('page') page:string){
      
        try {
          // const sellers :any = await this.httpService.get(`http://localhost:3004/seller/getseller/${id}`).toPromise()
                    const sellers :any = await this.httpService.get(`${urluser}/seller/getseller/${id}`).toPromise()


          // const products :any = await this.httpService.get(`http://localhost:3002/product/getallbyseller`,{
                    const products :any = await this.httpService.get(`${urlproduct}/product/getallbyseller`,{

            params:{
              seller_id:id,page,limit
            }
          }).toPromise()

          return {
            success:true,
            data:{
              seller:sellers.data,products:products.data
            },
            message:'ok'
          }
          
          
         } catch (error) {
          return{
            success:false,
            message:error,
            data:null
          } 
        }
    }
}
