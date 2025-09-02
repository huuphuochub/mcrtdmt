// users.controller.ts

import { Controller, Post, Get, Param, Body,UploadedFile,UseInterceptors, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuardFromCookie } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';




// import { UploadService } from 'src/cloundinary/cloudinary.service';
// import { FileInterceptor } from '@nestjs/platform-express';


@Controller('users')
export class UsersController {
  constructor(
    private  usersService: UsersService,
        private readonly authService: AuthService,

    // private uploadservice: UploadService
) {}


  @Post('register')
    // @UseInterceptors(FileInterceptor('file'))

     async Registeruser(
        // @UploadedFile() file: Express.Multer.File,

        @Body()
        
        body:{
        username:string; 
        password:string, 
        phone:string, 
        provinceId:number, 
        districId:number, 
        wardsId:number, 
 },
    ){
        // const avatarUrl = await this.uploadservice.uploadImage(file)
        // console.log(body);
        
        return this.usersService.Registersuser(body.username,body.password,body.phone,body.provinceId,body.districId,body.wardsId)
    }

    @Post("login")
    async LoginUser(
        @Body()
        body:{
        phone:string;
        password:string;
        },
        // @Res({ passthrough: true }) res: Response
    ){
        const result =await this.usersService.LoginUser(body.phone,body.password);

         if (!result.success || !result.user) {
    return result;
    }
    // console.log(result);
    
  // Set cookie
     const token = this.authService.generateToken({ 
      id: result.user.id ,
      username:result.user.username,
      isActive:result.user.isActive,
      avatarUrl:result.user.avatarUrl,
      role:result.user.role,
      districtId:result.user.districtId,
      wardsId:result.user.wardsId,
      provinceId:result.user.provinceId,
      phone:result.user.phone});
    // res.cookie('access_token', token, {
    //   httpOnly: true,
    //   maxAge: 1000 * 60 * 60 *24 * 7,
    // });

  // Trả về thông tin người dùng (không bao gồm token)
  // console.log("da dang nhap va luu coookie");
  
 return { success: true, message: 'Đăng nhập thành công',token };


  } 

 @UseGuards(JwtAuthGuardFromCookie)
  @Get('me')
  async getProfile(@GetUser() user: any) {
    // console.log('da goi me');
    // console.log(user);
    
    return await this.usersService.GetuserById(user.id);
  }

//  @UseGuards(JwtAuthGuardFromCookie)
//   @Get('user')
//   async getProfleuser(@GetUser() user: any) {
//     console.log('da goi me');
//     console.log(user);
    
//     return await this.usersService.findById(user.id);
//   }    

  @Post('logout')
logout(@Res({ passthrough: true }) res: Response) {
  res.clearCookie('access_token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // true nếu dùng HTTPS
  });

  return {
    success: true,
    message: 'Đăng xuất thành công',
  };
}
  @Get('getuser/:id')
  async getuserbyid(@Param('id')id:number){
    return this.usersService.GetuserById(id);
  }


   @UseGuards(JwtAuthGuardFromCookie)
  @Post('updateprofile')
  async updateProfile(
    @GetUser() user: any,
    @Body() updateData: any
  ) {
    return this.usersService.updateProfile(user.id, updateData);
  }

}
