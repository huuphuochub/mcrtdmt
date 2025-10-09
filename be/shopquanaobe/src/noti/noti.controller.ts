import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotiService } from './noti.service';

@Controller('noti')
export class NotiController {
    constructor(

                private notiService:NotiService,

    ){
    }

    @Post('addnoti')
    async AddNoti(@Body() body:any){
        console.log(body);
        
        return await this.notiService.AddNoti(body)
    }

    @Get('notiseller/:id')
    async GetNotiSeller(@Param('id') id:number){
        return await this.notiService.GetNotiSeller(id);
    }
}
