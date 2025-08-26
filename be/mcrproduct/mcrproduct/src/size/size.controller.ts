


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

   @Post('batch')
    async getbatch(
        @Body('ids') ids:number[]
    ){
        if(!ids || ids.length === 0){
            return{
                success:false,
                data:null,
                message:'khong co mang id'
            }
        }
        return await this.sizeService.Getbatch(ids);
    }

    @Post('batchcolor')
    async getbatchcolor(
        @Body('ids') ids:number[]
    ){
        if(!ids || ids.length === 0){
            return{
                success:false,
                data:null,
                message:'khong co mang id'
            }
        }
        return await this.sizeService.Getbatchcolor(ids);
    }
}
 