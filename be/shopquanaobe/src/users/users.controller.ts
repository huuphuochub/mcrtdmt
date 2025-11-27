// users.controller.ts

import { Controller, Post, Get, Param, Body,UploadedFile,UseInterceptors, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuardFromCookie } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
// import { AuthService } from 'src/auth/auth.service';



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
        avatarUrl:string,
 },
    ){
        // const avatarUrl = await this.uploadservice.uploadImage(file)
        console.log(body);
        
        
        return this.usersService.Registersuser(body.username,body.password,body.phone,body.provinceId,body.districId,body.wardsId,body.avatarUrl)
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
  
 return { success: true, message: 'Đăng nhập thành công',token };


  } 

 @UseGuards(JwtAuthGuardFromCookie)
  @Get('me')
  async getProfile(@GetUser() user: any) {

    
    return await this.usersService.GetuserById(user.id);
  }

//  @UseGuards(JwtAuthGuardFromCookie)
//   @Get('user')
//   async getProfleuser(@GetUser() user: any) {

    
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

      //   lay thong tin user tu mang id user
  @Post('inforusers')
  async InforUsers(@Body() ids:{ok:number[]}){
    
    return await this.usersService.InForUsers(ids.ok)
    
  }

  @Post('settinginfor')
  async SettingInfor(@Body() body:any){
    console.log(body);
    
    return await this.usersService.SettingInfor(body)
  }

  @Post('resetpassword')
  async ResetPassword(@Body() body:{password:string,newpassword:string,id:number}){
    return await this.usersService.ResetPassword(body.id,body.password,body.newpassword)
  } 

  @Post('checkmail')
  async CheckMail(@Res({ passthrough: true }) res: Response,@Body() body:any){
    console.log(body.email);
       
    return await this.usersService.CheckMail(body.email)
    // console.log(result.success);
    
  }

  @Post('verifyotp')
  async VerifyMail(@Body() body:{email:string,code:string}){
    console.log(body);
    return await this.usersService.VerifyMail(body.email,body.code)
  }

  @Post('resetpassviaemail')
  async ResetPassViaEmail(@Body() body:{email:string,newpassword:string}){
    return await this.usersService.ResetPassViaEmail(body.email,body.newpassword)
  }

}
