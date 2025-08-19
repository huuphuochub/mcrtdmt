


import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SizeService } from './size.service';
@Controller('size')
export class SizeController {
    constructor(
        private sizeService:SizeService,

    ){

    }

    // lay tat ca size theo id product
    @Get('getsizebyidprd/:id')
    async getsizeidprd(@Param('id') id:number){
        // console.log(id);
        
        return this.sizeService.getsizebyidprd(id);
    }

   
}
 