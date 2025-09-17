import { Body, Controller, Delete, Get, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtAuthGuardFromCookie } from 'src/auth/jwt-auth.guard';


interface RequestWithCookies extends Request {
  cookies: Record<string, string>;
}

@Controller('commentproduct')
export class CommentProductController {
      constructor(private readonly httpService: HttpService) {}

         @UseGuards(JwtAuthGuardFromCookie)
      @Post('addcomment')
      async AddComment(@Body() body:any, @GetUser() user:any){
            
            
            if(!user){
                  return{
                        success:false,
                        data:null,
                        message:'vui long dang nhap'
                  }
            }
            const bodypost = {
                  user_id:user.id,
                  star:body.star,
                  content:body.content,
                  product_id:body.product_id

            }

            console.log(bodypost);
            
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

      @Post('getall')
      async Getallcmt(@Body() body:any){
            
            try {
                  const response:any = await firstValueFrom(
                        this.httpService.post('http://localhost:3002/comment/getallcmt', body)
                  );
                  // console.log(response.data.data.data.data.user_id);
                  // console.log(response.data.data);

                  if(response){
                        const ok = response.data.data.map(item => item.user_id)
                        // console.log(ok);
                        const Users:any = await this.httpService.post('http://localhost:3004/users/inforusers', { ok }).toPromise();

                        // console.log(Users.data);

                          const usersMap = new Map(Users.data.map(u => [u.id, u]));

                        const merged = response.data.data.map(c => ({
                              ...c,
                              user: usersMap.get(c.user_id) || null
                              }));
                        console.log(merged);
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
            console.log(id);
            
            const dev:any = await firstValueFrom(
            
            
            this.httpService.delete(`http://localhost:3002/comment/delete/${id}`))
            return dev.data
      }
  
}


