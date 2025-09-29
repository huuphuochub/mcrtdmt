import { Controller, Inject, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";

import { Body, Get, Param, Post, Query, Req } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Request } from "express";
import { buffer, firstValueFrom } from "rxjs";
import { JwtSellerAuthGuardFromCookie } from "src/auth/seller-jwt.guard";
import { GetSeller } from "src/common/decorators/get-seller.decorator";
import { ClientProxy } from "@nestjs/microservices";
import { JwtAuthGuardFromCookie } from "src/auth/jwt-auth.guard";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ChatGateway } from "src/service/socketio/socketio";
interface RequestWithCookies extends Request {
  cookies: Record<string, string>;
}
@Controller('chat')
export class Chatcontroller {
    constructor(private readonly httpService: HttpService,
        private readonly chatGateway: ChatGateway,
        @Inject('SUBIMG_SERVICE') private readonly uploadimgsendmess:ClientProxy

    ) {}
    
    @Post('check')
    async checkroom(
        @Req() req:RequestWithCookies,
        @Body() body:any
    ) {

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
             const response = await firstValueFrom(
            this.httpService.post('http://localhost:3004/chat/check', body,{
                
                headers: {
                    Authorization: `Bearer ${token}`,
                    },
            })
            
        );
        return response.data;
       } catch (error) {
           return {
               success: false,
               message: 'Error occurred',
               data: null,
               code: 500
           };
       }
        
    
    }

    @Post('rooms')
    async GetRoom(@Req() req:RequestWithCookies){
        const token = req.cookies.access_token;
        if(!token){
            return{
                success:false,
                message:'chua dang nhap',
                data:null
            }
        }
        try {
            const allroom:any = await firstValueFrom(
            this.httpService.post('http://localhost:3004/chat/rooms',{},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }))
            return allroom.data
        } catch (error) {
            return{
                success:false,
                message:'loi gateway',
                data:null,
            }
        }
    }

    @Post('creatroom')
    async Createroom(@Body() body:any,@Req() req:RequestWithCookies){
        const token = req.cookies.access_token
        if(!token){
            return{
                success:false,
                message:'chua dang nhap'
            }
        }
        try {
            const room = await firstValueFrom(
            
            this.httpService.post('http://localhost:3004/chat/create',{seller_id:body.seller_id},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ))
            return room.data
        } catch (error) {
            return{
                success:false,
                message:'loi',
                data:null
            }
        }
    }

    @Get('chatitems')
    async GetChatItem(@Query('room_id') room_id:number,@Query('page') page:number){
        try {
            const items:any= await this.httpService.get('http://localhost:3004/chat/chatitems',{
                params:{
                    room_id:room_id,page:page
                }
            }).toPromise()
            return items.data
        } catch (error) {
            return{
                success:false,
                message:'loi gate way',
                data:null
            }
        }
    }


    // @UseGuards(JwtSellerAuthGuardFromCookie)
    @UseGuards(JwtAuthGuardFromCookie)
    @Post('sendmess')
    @UseInterceptors(FileFieldsInterceptor([
        {name:'files',maxCount:3}
    ]))
    async SendMess(
        @GetUser() user:any,
        @Body() body:any,
        @UploadedFiles() files:{
            files?:Express.Multer.File[],
        }

){


        

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
            // const images = imgs.map(item => item)
            const data = {
                room:body.room_id,
                user_id:body.role === 'user' ? user.id : null,
                seller_id:body.role === "seller" ? body.seller_id : null,
                message:body.message,
                status:0,
                imageurl:imgs,
                tag:{id:body.tag,name:body.nametag,image:body.imagetag}
            }

            const send:any = await this.httpService.post('http://localhost:3004/chat/sendmess',data).toPromise()
            if(send.data.success){
                const messagenew = {
                    id:send.data.data.id,
                    message:send.data.data.message,
                    role:body.role,
                    imageurl:send.data.data.imageurl,
                    tag:send.data.data.tag,
                    user:{id:Number(user.id)},
                    seller:{id:Number(body.seller_id)},
                    createdAt:send.data.data.createdAt,
                    status:send.data.data.status,
                    room:send.data.data.room.id,

                }

                this.chatGateway.processAndEmit(messagenew)
                
            }

            
        }

        if(imgs.length ===0){
             const data = {
                room:body.room_id,
                user_id:user.id,
                seller_id:null,
                message:body.message,
                status:0,
                imageurl:null,
                tag:{id:body.tag,name:body.nametag,image:body.imagetag}
            }

            const send :any= await this.httpService.post('http://localhost:3004/chat/sendmess',data).toPromise()
            if(send.data.success){
                const messagenew = {
                    id:send.data.data.id,
                    message:send.data.data.message,
                    role:body.role,
                    imageurl:send.data.data.imageurl,
                    tag:send.data.data.tag,
                    user:{id:Number(user.id)},
                    seller:{id:Number(body.seller_id)},
                    createdAt:send.data.data.createdAt,
                    status:send.data.data.status,
                    room:send.data.data.room.id,

                }
                this.chatGateway.processAndEmit(messagenew)

            }
            
        }
        
    }


        @UseGuards(JwtSellerAuthGuardFromCookie)
    @Post('sendmesseller')
    @UseInterceptors(FileFieldsInterceptor([
        {name:'files',maxCount:3}
    ]))
    async SendMessseller(
        @GetSeller() seller:any,
        @Body() body:any,
        @UploadedFiles() files:{
            files?:Express.Multer.File[],
        }

){ 


        

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
            // const images = imgs.map(item => item)
            const data = {
                room:body.room_id,
                user_id:body.role === 'user' ? body.user_id : null,
                seller_id:body.role === "seller" ? seller.seller_id : null,
                message:body.message,
                status:0,
                imageurl:imgs,
                tag:{id:body.tag,name:body.nametag,image:body.imagetag}
            }
            const send:any = await this.httpService.post('http://localhost:3004/chat/sendmess',data).toPromise()
            if(send.data.success){
                const messagenew = {
                    id:send.data.data.id,
                    message:send.data.data.message,
                    role:body.role,
                    imageurl:send.data.data.imageurl,
                    tag:send.data.data.tag,
                    user:{id:Number(body.user_id)},
                    seller:{id:Number(seller.seller_id)},
                    createdAt:send.data.data.createdAt,
                    status:send.data.data.status,
                    room:send.data.data.room.id,

                }


                this.chatGateway.processAndEmit(messagenew)
                
            }

            
        }

        if(imgs.length ===0){
             const data = {
                room:body.room_id,
                user_id:null,
                seller_id:seller.seller_id,
                message:body.message,
                status:0,
                imageurl:null,
                tag:{id:body.tag,name:body.nametag,image:body.imagetag}
            }
            const send :any= await this.httpService.post('http://localhost:3004/chat/sendmess',data).toPromise()
            if(send.data.success){
                const messagenew = {
                    id:send.data.data.id,
                    message:send.data.data.message,
                    role:body.role,
                    imageurl:send.data.data.imageurl,
                    tag:send.data.data.tag,
                    user:{id:Number(body.user_id)},
                    seller:{id:Number(seller.seller_id)},
                    createdAt:send.data.data.createdAt,
                    status:send.data.data.status,
                    room:send.data.data.room.id,

                }
               
                this.chatGateway.processAndEmit(messagenew)

            }
            
        }
        
    }
 


    

    @UseGuards(JwtSellerAuthGuardFromCookie)
    @Get('roomseller')
    async GetRoomSeller(@GetSeller() seller:any){
       
        if(!seller){
            return{
                success:false,
                message:'khong phai seller'
            }
        }
        try {
            const room:any = await this.httpService.get('http://localhost:3004/chat/roomseller',{
                params:{seller_id:seller.seller_id}
            }).toPromise()

            return room.data
        } catch (error) {
            return{
                success:false,
                message:'loi gateway',
                data:null
            }
        }

    }

}