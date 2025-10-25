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
        
        return await this.notiService.AddNoti(body)
    }

    @Get('notiseller/:id')
    async GetNotiSeller(@Param('id') id:number){
        return await this.notiService.GetNotiSeller(id);
    }

     @Get('notiuser/:id')
    async GetNotiUser(@Param('id') id:number){
        return await this.notiService.GetNotiUser(id);
    }
    @Post('updatenoti/:id')
    async UpdateNoti(@Param('id') id:number){
        return await this.notiService.UpdateNoti(id);
    }
}
