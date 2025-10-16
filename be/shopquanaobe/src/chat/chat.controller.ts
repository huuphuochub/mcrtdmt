import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuardFromCookie } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {

    }

    @Post('create')
    @UseGuards(JwtAuthGuardFromCookie)
    async createChat(@Body() body: any,@GetUser() user:any) {
       return await this.chatService.Createroom(Number(body.seller_id),Number(user.id));
       
    }
     @UseGuards(JwtAuthGuardFromCookie)
    @Post('check')
    async CheckRoom(@Body() body: any,@GetUser() user:any) {
      return await this.chatService.CheckRoom(Number(body.seller_id),Number(user.id));
    }

    @UseGuards(JwtAuthGuardFromCookie)
    @Post('rooms')
    async getRooms(@GetUser() user:any) {
      return await this.chatService.getRooms(user.id);
    }
    @Get('chatitems')
    async GetChatItem(@Query('room_id') room_id:number, @Query('page') page:number){
      // return await
      return await this.chatService.GetChatitems(Number(room_id),Number(page))
    }

    @Get('roomseller')
    async GetRoomSeller(@Query('seller_id') seller_id:any){
      
      return await this.chatService.GetRoomSeller(Number(seller_id))
    }

    @Post('sendmess')
    async SendChat(@Body() body:any){
      
      return await this.chatService.SendChat(body);
    }

    @Post('watchitem')
    async WatchMessItem(@Body() body:any){
      await this.chatService.WatchedMesItem(body);
      
    }

    @Post('watchitemclick')
    async WatchItemClick(@Body() body:any){
      await this.chatService.WatchedMesItemClick(body);
      
    }

}
 