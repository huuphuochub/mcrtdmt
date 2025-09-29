import { Body, Controller, Post } from '@nestjs/common';
import { NotiService } from './noti.service';

@Controller('noti')
export class NotiController {
    constructor(

                private notiService:NotiService,

    ){
    }

    @Post('addnoti')
    async AddNoti(@Body() body:any){
        
    }
}
