import { Body, Controller, Delete, Get, Inject, Param, Post, Query, Req, UnauthorizedException, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtAuthGuardFromCookie } from 'src/auth/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';


interface RequestWithCookies extends Request {
  cookies: Record<string, string>;
}

@Controller('commentproduct')
export class CommentProductController {
      constructor(private readonly httpService: HttpService,
      @Inject('SUBIMG_SERVICE') private readonly uploadimgsendmess:ClientProxy

      ) {}

         @UseGuards(JwtAuthGuardFromCookie)
      @Post('addcomment')
          @UseInterceptors(FileFieldsInterceptor([
              {name:'files',maxCount:3}
          ]))
      async AddComment(@Body() body:any, @GetUser() user:any,
            @UploadedFiles() files:{
                  files?:Express.Multer.File[],
              }){
            
            
            if(!user){
                  return{
                        success:false,
                        data:null,
                        message:'vui long dang nhap'
                  }
            }
            let imgs :string[] =[]

            const images = files.files ?? [];

            if(images.length>0){
            const img = await this.uploadimgsendmess
            .send('subimg_queue' ,{
                files:images.map(f=>({
                    buffer:f.buffer,
                    originalname:f.originalname,
                    mimetipe:f.mimetype,
                }))
            }).toPromise()
            imgs = img.urls
        }

        if(imgs.length>0){
            const bodypost = {
                  user_id:user.id,
                  star:body.star,
                  content:body.content,
                  product_id:body.product_id,
                  imageurl:imgs

            }

             
            try {
                  const response = await firstValueFrom(
                        this.httpService.post('http://localhost:3002/comment/addcomment', bodypost)
                        );
                  await firstValueFrom(
                        this.httpService.post('http://localhost:3002/product/updateratingproduct',bodypost)
                  ) 
                  return{
                        success:true,
                        data:response.data,
                        message:'thanh cong',

                  }
            } catch (error) {
                  return{
                        success:false,
                        data:null,
                        message:error
                  }
            }
        }

        if(imgs.length === 0){
            const bodypost = {
                  user_id:user.id,
                  star:body.star,
                  content:body.content,
                  product_id:body.product_id,
                  imageurl:null,

            }

             
            try {
                  const response = await firstValueFrom(
                        this.httpService.post('http://localhost:3002/comment/addcomment', bodypost)
                        );
                  await firstValueFrom(
                        this.httpService.post('http://localhost:3002/product/updateratingproduct',bodypost)
                  )
                  return{
                        success:true,
                        data:response.data,
                        message:'thanh cong',

                  }
            } catch (error) {
                  return{
                        success:false,
                        data:null,
                        message:error
                  }
            }
        }

            

           

      }


      @UseGuards(JwtAuthGuardFromCookie)
      @Post('addcmtseller')
          @UseInterceptors(FileFieldsInterceptor([
              {name:'files',maxCount:3}
          ]))
      async AddCmtSeller(@Body() body:any, @GetUser() user:any,
            @UploadedFiles() files:{
                  files?:Express.Multer.File[],
              }){
            
            
            if(!user){
                  return{
                        success:false,
                        data:null,
                        message:'vui long dang nhap'
                  }
            }
            let imgs :string[] =[]

            const images = files.files ?? [];

            if(images.length>0){
            const img = await this.uploadimgsendmess
            .send('subimg_queue' ,{
                files:images.map(f=>({
                    buffer:f.buffer,
                    originalname:f.originalname,
                    mimetipe:f.mimetype,
                }))
            }).toPromise()
            imgs = img.urls
        }

        if(imgs.length>0){
            const bodypost = {
                  user_id:user.id,
                  star:Number(body.star),
                  content:body.content,
                  // product_id:body.product_id,
                  imageurl:imgs,
                  seller_id:Number(body.seller_id)

            }

             
            try {
                  const response = await firstValueFrom(
                        this.httpService.post('http://localhost:3004/seller/addcmtseller', bodypost)
                        );
                  // await firstValueFrom(
                  //       this.httpService.post('http://localhost:300/product/updateratingproduct',bodypost)
                  // ) 
                  return{
                        success:true,
                        data:response.data,
                        message:'thanh cong',

                  }
            } catch (error) {
                  return{
                        success:false,
                        data:null,
                        message:error
                  }
            }
        }

        if(imgs.length === 0){
            const bodypost = {
                  user_id:user.id,
                  star:Number(body.star),
                  content:body.content,
                  // product_id:body.product_id,
                  imageurl:null,
                  seller_id:Number(body.seller_id)


            }

             
            try {
                  const response = await firstValueFrom(
                        this.httpService.post('http://localhost:3004/seller/addcmtseller', bodypost)
                        );
                  // await firstValueFrom(
                  //       this.httpService.post('http://localhost:3002/product/updateratingproduct',bodypost)
                  // )
                  return{
                        success:true,
                        data:response.data,
                        message:'thanh cong',

                  }
            } catch (error) {
                  return{
                        success:false,
                        data:null,
                        message:error
                  }
            }
        }

            

           

      }



      @Post('getall')
      async Getallcmt(@Body() body:any){
            
            try {
                  const response:any = await firstValueFrom(
                        this.httpService.post('http://localhost:3002/comment/getallcmt', body)
                  );


                  if(response){
                        const ok = response.data.data.map(item => item.user_id)
                        const Users:any = await this.httpService.post('http://localhost:3004/users/inforusers', { ok }).toPromise();


                          const usersMap = new Map(Users.data.map(u => [u.id, u]));

                        const merged = response.data.data.map(c => ({
                              ...c,
                              user: usersMap.get(c.user_id) || null
                              }));
                        return{
                              success:true,
                              data:merged,
                              message:'da lay'
                        }

                        }     

                        

                  
            
            } catch (error) { 
                  return{
                        success:false,
                        data:null,
                        message:error
                  }      
            }
      }
      

      @Delete('delete/:id')
      async DeleteCmt(@Param('id') id:number){
            
            const dev:any = await firstValueFrom(
            
            
            this.httpService.delete(`http://localhost:3002/comment/delete/${id}`))
            return dev.data
      }

      @Get('getcmtseller/:id')
      async GetCmtSeller(@Param('id') id:number,@Query('page') page:number){
            try {
                  const data:any = await this.httpService.get(`http://localhost:3004/seller/getcmtseller/${id}`,{params:{page:page}}).toPromise()
                  return data.data
            } catch (error) {
                  return{
                        success:false,
                        data:null,
                        message:error.message
                  }
            }
      }
  
}


